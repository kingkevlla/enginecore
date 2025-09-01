import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Shield, Loader2 } from "lucide-react";

interface PaymentGatewayProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export const PaymentGateway = ({ 
  amount, 
  currency = "USD", 
  description = "Payment", 
  onSuccess, 
  onError 
}: PaymentGatewayProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPaymentSettings();
  }, []);

  const loadPaymentSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('value')
        .eq('key', 'payment_settings')
        .single();

      if (error) throw error;
      setPaymentSettings(data?.value);
    } catch (error) {
      console.error('Error loading payment settings:', error);
    }
  };

  const processStripePayment = async () => {
    setLoading(true);
    try {
      // Get the auth header for the current user
      const { data: { session } } = await supabase.auth.getSession();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const { data, error } = await supabase.functions.invoke('create-stripe-payment', {
        body: {
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency.toLowerCase(),
          description,
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Stripe",
          description: "Please complete your payment in the new tab.",
        });
        onSuccess?.(data.session_id);
      }
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      const errorMessage = error.message || 'Payment failed';
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const processPayPalPayment = async () => {
    setLoading(true);
    try {
      // Get the auth header for the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase.functions.invoke('create-paypal-payment', {
        body: {
          amount,
          currency,
          description,
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open PayPal checkout in new tab
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to PayPal",
          description: "Please complete your payment in the new tab.",
        });
        onSuccess?.(data.payment_id);
      }
    } catch (error: any) {
      console.error('PayPal payment error:', error);
      const errorMessage = error.message || 'PayPal payment failed';
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!paymentSettings) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading payment options...</p>
        </CardContent>
      </Card>
    );
  }

  const hasEnabledPayments = paymentSettings.stripe_enabled || paymentSettings.paypal_enabled;

  if (!hasEnabledPayments) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No payment methods are currently configured.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Options
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            ${amount.toFixed(2)} {currency}
          </Badge>
          {paymentSettings.test_mode && (
            <Badge variant="secondary" className="text-xs">
              Test Mode
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          {description}
        </div>

        <div className="space-y-3">
          {paymentSettings.stripe_enabled && (
            <Button
              onClick={processStripePayment}
              disabled={loading}
              className="w-full"
              variant="default"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              Pay with Stripe
            </Button>
          )}

          {paymentSettings.paypal_enabled && (
            <Button
              onClick={processPayPalPayment}
              disabled={loading}
              className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              Pay with PayPal
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
          <Shield className="h-3 w-3" />
          <span>Secure payment processing</span>
        </div>
      </CardContent>
    </Card>
  );
};