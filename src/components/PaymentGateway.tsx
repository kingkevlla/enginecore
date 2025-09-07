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
  const { toast } = useToast();
  
  const [paymentSettings, setPaymentSettings] = useState({
    stripe_enabled: false,
    paypal_enabled: false,
    crypto_enabled: false,
    test_mode: true
  });

  // Load payment settings from database
  useEffect(() => {
    const loadPaymentSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('website_settings')
          .select('*')
          .in('key', ['stripe_settings', 'paypal_settings', 'crypto_settings']);

        if (error) throw error;

        const settings: any = {};
        data?.forEach(setting => {
          settings[setting.key] = setting.value;
        });

        setPaymentSettings({
          stripe_enabled: settings.stripe_settings?.enabled || false,
          paypal_enabled: settings.paypal_settings?.enabled || false,
          crypto_enabled: settings.crypto_settings?.enabled || false,
          test_mode: settings.stripe_settings?.test_mode ?? true
        });
      } catch (error) {
        console.error('Error loading payment settings:', error);
      }
    };

    loadPaymentSettings();
  }, []);

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

  const processCryptoPayment = async (currency: string) => {
    setLoading(true);
    try {
      // Get crypto settings
      const { data, error } = await supabase
        .from('website_settings')
        .select('value')
        .eq('key', 'crypto_settings')
        .single();

      if (error) throw error;

      const cryptoSettings = data.value as any;
      let address = '';
      
      switch (currency.toLowerCase()) {
        case 'btc':
          address = cryptoSettings?.btc_address || '';
          break;
        case 'usdt':
          address = cryptoSettings?.usdt_address || '';
          break;
        case 'eth':
          address = cryptoSettings?.eth_address || '';
          break;
        case 'bnb':
          address = cryptoSettings?.bnb_address || '';
          break;
        default:
          throw new Error('Unsupported cryptocurrency');
      }

      if (!address) {
        throw new Error(`${currency.toUpperCase()} address not configured`);
      }

      toast({
        title: `${currency.toUpperCase()} Payment`,
        description: `Send ${amount} ${currency.toUpperCase()} to: ${address}`,
        duration: 10000,
      });

      onSuccess?.(`crypto_${currency}_${Date.now()}`);
    } catch (error: any) {
      console.error('Crypto payment error:', error);
      const errorMessage = error.message || 'Cryptocurrency payment failed';
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

  const hasEnabledPayments = paymentSettings.stripe_enabled || paymentSettings.paypal_enabled || paymentSettings.crypto_enabled;

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
              Pay with Card
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

          {paymentSettings.crypto_enabled && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Cryptocurrency Options</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => processCryptoPayment('btc')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  Bitcoin (BTC)
                </Button>
                <Button
                  onClick={() => processCryptoPayment('usdt')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  USDT
                </Button>
                <Button
                  onClick={() => processCryptoPayment('eth')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  Ethereum (ETH)
                </Button>
                <Button
                  onClick={() => processCryptoPayment('bnb')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  BNB
                </Button>
              </div>
            </div>
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