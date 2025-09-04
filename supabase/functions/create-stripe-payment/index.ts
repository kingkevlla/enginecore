import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get Stripe secret key from environment variables
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeSecretKey) {
      throw new Error("Stripe secret key not configured");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Get request body
    const { amount, currency = "usd", description = "Payment" } = await req.json();

    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    // Get user if authenticated
    const authHeader = req.headers.get("Authorization");
    let user = null;
    let customerId = null;

    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
        if (!userError && userData.user) {
          user = userData.user;
          
          // Check if customer exists in Stripe
          const customers = await stripe.customers.list({ 
            email: user.email, 
            limit: 1 
          });
          
          if (customers.data.length > 0) {
            customerId = customers.data[0].id;
          }
        }
      } catch (error) {
        console.log("User not authenticated, proceeding as guest");
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : (user?.email || "guest@example.com"),
      line_items: [
        {
          price_data: {
            currency,
            product_data: { 
              name: description 
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
    });

    // Record payment attempt in database
    if (user) {
      await supabaseClient.from("orders").insert({
        user_id: user.id,
        stripe_session_id: session.id,
        total_amount: amount / 100,
        currency,
        status: "pending",
        payment_status: "pending",
        order_number: `ORDER-${Date.now()}`,
        subtotal: amount / 100,
      });
    }

    return new Response(
      JSON.stringify({ 
        url: session.url, 
        session_id: session.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Stripe payment error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Payment processing failed" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});