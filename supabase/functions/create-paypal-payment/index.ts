import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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

    // Get payment settings from database
    const { data: settingsData, error: settingsError } = await supabaseClient
      .from('website_settings')
      .select('value')
      .eq('key', 'payment_settings')
      .single();

    if (settingsError || !settingsData?.value?.paypal_enabled) {
      throw new Error("PayPal payments are not enabled");
    }

    const paymentSettings = settingsData.value;
    const { paypal_client_id, paypal_client_secret, test_mode } = paymentSettings;

    if (!paypal_client_id || !paypal_client_secret) {
      throw new Error("PayPal credentials not configured");
    }

    // Get request body
    const { amount, currency = "USD", description = "Payment" } = await req.json();

    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    // PayPal API base URL
    const baseURL = test_mode 
      ? "https://api-m.sandbox.paypal.com" 
      : "https://api-m.paypal.com";

    // Get PayPal access token
    const authResponse = await fetch(`${baseURL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-Language": "en_US",
        "Authorization": `Basic ${btoa(`${paypal_client_id}:${paypal_client_secret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!authResponse.ok) {
      throw new Error("Failed to get PayPal access token");
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Create PayPal order
    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description,
        },
      ],
      application_context: {
        return_url: `${req.headers.get("origin")}/payment-success`,
        cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
        brand_name: "Engine Parts Store",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    };

    const orderResponse = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!orderResponse.ok) {
      throw new Error("Failed to create PayPal order");
    }

    const order = await orderResponse.json();
    const approvalUrl = order.links.find((link: any) => link.rel === "approve")?.href;

    if (!approvalUrl) {
      throw new Error("No approval URL found in PayPal response");
    }

    // Get user if authenticated and record payment attempt
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
        if (!userError && userData.user) {
          await supabaseClient.from("orders").insert({
            user_id: userData.user.id,
            payment_intent_id: order.id,
            total_amount: amount,
            currency,
            status: "pending",
            payment_status: "pending",
            payment_method: "paypal",
            order_number: `ORDER-${Date.now()}`,
            subtotal: amount,
          });
        }
      } catch (error) {
        console.log("User not authenticated, proceeding as guest");
      }
    }

    return new Response(
      JSON.stringify({ 
        url: approvalUrl, 
        payment_id: order.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("PayPal payment error:", error);
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