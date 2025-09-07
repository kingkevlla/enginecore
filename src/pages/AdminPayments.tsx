import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { 
  CreditCard, 
  DollarSign, 
  Shield, 
  Settings, 
  Bitcoin,
  Wallet,
  Eye,
  EyeOff
} from "lucide-react";

const AdminPayments = () => {
  const { toast } = useToast();
  const { getSetting, updateSetting } = useWebsiteSettings();
  const [showSecrets, setShowSecrets] = useState(false);
  
  // Payment gateway states
  const [stripeSettings, setStripeSettings] = useState({
    enabled: false,
    test_mode: true,
    publishable_key: "",
    secret_key: "",
    webhook_secret: ""
  });

  const [paypalSettings, setPaypalSettings] = useState({
    enabled: false,
    test_mode: true,
    client_id: "",
    client_secret: "",
    webhook_id: ""
  });

  const [cryptoSettings, setCryptoSettings] = useState({
    enabled: false,
    btc_address: "",
    usdt_address: "",
    eth_address: "",
    bnb_address: ""
  });

  const [generalSettings, setGeneralSettings] = useState({
    default_currency: "USD",
    tax_rate: 8,
    shipping_cost: 150,
    free_shipping_threshold: 500
  });

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      const stripe = getSetting('stripe_settings', {});
      const paypal = getSetting('paypal_settings', {});
      const crypto = getSetting('crypto_settings', {});
      const general = getSetting('payment_general', {});

      setStripeSettings({ ...stripeSettings, ...stripe });
      setPaypalSettings({ ...paypalSettings, ...paypal });
      setCryptoSettings({ ...cryptoSettings, ...crypto });
      setGeneralSettings({ ...generalSettings, ...general });
    };

    loadSettings();
  }, []);

  const saveStripeSettings = async () => {
    try {
      await updateSetting('stripe_settings', stripeSettings, 'Stripe payment gateway settings');
      toast({
        title: "Success",
        description: "Stripe settings saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Stripe settings",
        variant: "destructive",
      });
    }
  };

  const savePayPalSettings = async () => {
    try {
      await updateSetting('paypal_settings', paypalSettings, 'PayPal payment gateway settings');
      toast({
        title: "Success", 
        description: "PayPal settings saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save PayPal settings",
        variant: "destructive",
      });
    }
  };

  const saveCryptoSettings = async () => {
    try {
      await updateSetting('crypto_settings', cryptoSettings, 'Cryptocurrency payment settings');
      toast({
        title: "Success",
        description: "Cryptocurrency settings saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save cryptocurrency settings",
        variant: "destructive",
      });
    }
  };

  const saveGeneralSettings = async () => {
    try {
      await updateSetting('payment_general', generalSettings, 'General payment settings');
      toast({
        title: "Success",
        description: "General settings saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save general settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-['Orbitron'] text-gradient">Payment Settings</h1>
          <p className="text-muted-foreground">Configure payment gateways and checkout options</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSecrets(!showSecrets)}
          className="gap-2"
        >
          {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showSecrets ? 'Hide' : 'Show'} Secrets
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="stripe" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Stripe
          </TabsTrigger>
          <TabsTrigger value="paypal" className="gap-2">
            <Wallet className="h-4 w-4" />
            PayPal
          </TabsTrigger>
          <TabsTrigger value="crypto" className="gap-2">
            <Bitcoin className="h-4 w-4" />
            Crypto
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                General Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input
                    id="currency"
                    value={generalSettings.default_currency}
                    onChange={(e) => setGeneralSettings({
                      ...generalSettings,
                      default_currency: e.target.value
                    })}
                    placeholder="USD"
                  />
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={generalSettings.tax_rate}
                    onChange={(e) => setGeneralSettings({
                      ...generalSettings,
                      tax_rate: Number(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="shipping">Shipping Cost ($)</Label>
                  <Input
                    id="shipping"
                    type="number"
                    value={generalSettings.shipping_cost}
                    onChange={(e) => setGeneralSettings({
                      ...generalSettings,
                      shipping_cost: Number(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="freeShipping">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeShipping"
                    type="number"
                    value={generalSettings.free_shipping_threshold}
                    onChange={(e) => setGeneralSettings({
                      ...generalSettings,
                      free_shipping_threshold: Number(e.target.value)
                    })}
                  />
                </div>
              </div>
              <Button onClick={saveGeneralSettings} className="w-full">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stripe Settings */}
        <TabsContent value="stripe">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Stripe Configuration
                <Badge variant={stripeSettings.enabled ? "default" : "secondary"}>
                  {stripeSettings.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="stripeEnabled"
                  checked={stripeSettings.enabled}
                  onCheckedChange={(checked) => setStripeSettings({
                    ...stripeSettings,
                    enabled: checked
                  })}
                />
                <Label htmlFor="stripeEnabled">Enable Stripe Payments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="stripeTestMode"
                  checked={stripeSettings.test_mode}
                  onCheckedChange={(checked) => setStripeSettings({
                    ...stripeSettings,
                    test_mode: checked
                  })}
                />
                <Label htmlFor="stripeTestMode">Test Mode</Label>
              </div>

              {stripeSettings.enabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="stripePublishable">Publishable Key</Label>
                    <Input
                      id="stripePublishable"
                      type={showSecrets ? "text" : "password"}
                      value={stripeSettings.publishable_key}
                      onChange={(e) => setStripeSettings({
                        ...stripeSettings,
                        publishable_key: e.target.value
                      })}
                      placeholder={stripeSettings.test_mode ? "pk_test_..." : "pk_live_..."}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stripeSecret">Secret Key</Label>
                    <Input
                      id="stripeSecret"
                      type={showSecrets ? "text" : "password"}
                      value={stripeSettings.secret_key}
                      onChange={(e) => setStripeSettings({
                        ...stripeSettings,
                        secret_key: e.target.value
                      })}
                      placeholder={stripeSettings.test_mode ? "sk_test_..." : "sk_live_..."}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stripeWebhook">Webhook Secret (Optional)</Label>
                    <Input
                      id="stripeWebhook"
                      type={showSecrets ? "text" : "password"}
                      value={stripeSettings.webhook_secret}
                      onChange={(e) => setStripeSettings({
                        ...stripeSettings,
                        webhook_secret: e.target.value
                      })}
                      placeholder="whsec_..."
                    />
                  </div>
                </div>
              )}

              <Button onClick={saveStripeSettings} className="w-full">
                Save Stripe Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PayPal Settings */}
        <TabsContent value="paypal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                PayPal Configuration
                <Badge variant={paypalSettings.enabled ? "default" : "secondary"}>
                  {paypalSettings.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="paypalEnabled"
                  checked={paypalSettings.enabled}
                  onCheckedChange={(checked) => setPaypalSettings({
                    ...paypalSettings,
                    enabled: checked
                  })}
                />
                <Label htmlFor="paypalEnabled">Enable PayPal Payments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="paypalTestMode"
                  checked={paypalSettings.test_mode}
                  onCheckedChange={(checked) => setPaypalSettings({
                    ...paypalSettings,
                    test_mode: checked
                  })}
                />
                <Label htmlFor="paypalTestMode">Sandbox Mode</Label>
              </div>

              {paypalSettings.enabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paypalClientId">Client ID</Label>
                    <Input
                      id="paypalClientId"
                      type={showSecrets ? "text" : "password"}
                      value={paypalSettings.client_id}
                      onChange={(e) => setPaypalSettings({
                        ...paypalSettings,
                        client_id: e.target.value
                      })}
                      placeholder="PayPal Client ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paypalClientSecret">Client Secret</Label>
                    <Input
                      id="paypalClientSecret"
                      type={showSecrets ? "text" : "password"}
                      value={paypalSettings.client_secret}
                      onChange={(e) => setPaypalSettings({
                        ...paypalSettings,
                        client_secret: e.target.value
                      })}
                      placeholder="PayPal Client Secret"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paypalWebhook">Webhook ID (Optional)</Label>
                    <Input
                      id="paypalWebhook"
                      type={showSecrets ? "text" : "password"}
                      value={paypalSettings.webhook_id}
                      onChange={(e) => setPaypalSettings({
                        ...paypalSettings,
                        webhook_id: e.target.value
                      })}
                      placeholder="PayPal Webhook ID"
                    />
                  </div>
                </div>
              )}

              <Button onClick={savePayPalSettings} className="w-full">
                Save PayPal Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cryptocurrency Settings */}
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5" />
                Cryptocurrency Configuration
                <Badge variant={cryptoSettings.enabled ? "default" : "secondary"}>
                  {cryptoSettings.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="cryptoEnabled"
                  checked={cryptoSettings.enabled}
                  onCheckedChange={(checked) => setCryptoSettings({
                    ...cryptoSettings,
                    enabled: checked
                  })}
                />
                <Label htmlFor="cryptoEnabled">Enable Cryptocurrency Payments</Label>
              </div>

              {cryptoSettings.enabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="btcAddress">Bitcoin (BTC) Address</Label>
                    <Input
                      id="btcAddress"
                      value={cryptoSettings.btc_address}
                      onChange={(e) => setCryptoSettings({
                        ...cryptoSettings,
                        btc_address: e.target.value
                      })}
                      placeholder="bc1..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="usdtAddress">Tether (USDT) Address</Label>
                    <Input
                      id="usdtAddress"
                      value={cryptoSettings.usdt_address}
                      onChange={(e) => setCryptoSettings({
                        ...cryptoSettings,
                        usdt_address: e.target.value
                      })}
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="ethAddress">Ethereum (ETH) Address</Label>
                    <Input
                      id="ethAddress"
                      value={cryptoSettings.eth_address}
                      onChange={(e) => setCryptoSettings({
                        ...cryptoSettings,
                        eth_address: e.target.value
                      })}
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="bnbAddress">Binance Coin (BNB) Address</Label>
                    <Input
                      id="bnbAddress"
                      value={cryptoSettings.bnb_address}
                      onChange={(e) => setCryptoSettings({
                        ...cryptoSettings,
                        bnb_address: e.target.value
                      })}
                      placeholder="bnb..."
                    />
                  </div>
                </div>
              )}

              <Button onClick={saveCryptoSettings} className="w-full">
                Save Cryptocurrency Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Payment Gateway Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Stripe</span>
              </div>
              <Badge variant={stripeSettings.enabled ? "default" : "secondary"}>
                {stripeSettings.enabled ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <span>PayPal</span>
              </div>
              <Badge variant={paypalSettings.enabled ? "default" : "secondary"}>
                {paypalSettings.enabled ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5" />
                <span>Cryptocurrency</span>
              </div>
              <Badge variant={cryptoSettings.enabled ? "default" : "secondary"}>
                {cryptoSettings.enabled ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;