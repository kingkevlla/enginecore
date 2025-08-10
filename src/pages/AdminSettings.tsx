import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [generalSettings, setGeneralSettings] = useState({
    site_name: 'Engine Parts Store',
    site_description: 'Premium engine parts and components',
    contact_email: 'contact@engineparts.com',
    contact_phone: '+1 (555) 123-4567',
    address: '123 Engine St, Motor City, MC 12345',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: '',
  });

  const [businessSettings, setBusinessSettings] = useState({
    tax_rate: '8.5',
    shipping_rate: '15.00',
    free_shipping_threshold: '100.00',
    currency: 'USD',
    timezone: 'America/New_York',
    business_hours: 'Mon-Fri 9AM-6PM EST',
  });

  const [emailSettings, setEmailSettings] = useState({
    enable_order_confirmations: true,
    enable_shipping_notifications: true,
    enable_newsletter: true,
    smtp_host: '',
    smtp_port: '587',
    smtp_username: '',
    smtp_password: '',
  });

  useEffect(() => {
    checkAdminAccess();
    loadSettings();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/admin/login');
      return;
    }

    const { data: adminData, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (error || !adminData) {
      navigate('/admin/login');
      return;
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*');

      if (error) throw error;

      // Convert array of settings to grouped objects
      if (data) {
        const settings = data.reduce((acc: any, setting: any) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {});

        // Update state with loaded settings
        if (settings.general_settings) {
          setGeneralSettings({ ...generalSettings, ...settings.general_settings });
        }
        if (settings.business_settings) {
          setBusinessSettings({ ...businessSettings, ...settings.business_settings });
        }
        if (settings.email_settings) {
          setEmailSettings({ ...emailSettings, ...settings.email_settings });
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (settingsType: string, settings: any) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          key: settingsType,
          value: settings,
          description: `${settingsType.replace('_', ' ')} configuration`,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <main className="flex-1">
          <header className="bg-background border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold">Admin Settings</h1>
                  <p className="text-muted-foreground">
                    Configure website and business settings
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="general" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="site_name">Site Name</Label>
                        <Input
                          id="site_name"
                          value={generalSettings.site_name}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            site_name: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact_email">Contact Email</Label>
                        <Input
                          id="contact_email"
                          type="email"
                          value={generalSettings.contact_email}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            contact_email: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="site_description">Site Description</Label>
                      <Textarea
                        id="site_description"
                        value={generalSettings.site_description}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          site_description: e.target.value
                        })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact_phone">Contact Phone</Label>
                        <Input
                          id="contact_phone"
                          value={generalSettings.contact_phone}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            contact_phone: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={generalSettings.address}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            address: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook_url">Facebook URL</Label>
                        <Input
                          id="facebook_url"
                          value={generalSettings.facebook_url}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            facebook_url: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter_url">Twitter URL</Label>
                        <Input
                          id="twitter_url"
                          value={generalSettings.twitter_url}
                          onChange={(e) => setGeneralSettings({
                            ...generalSettings,
                            twitter_url: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={() => saveSettings('general_settings', generalSettings)}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save General Settings'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="business">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                        <Input
                          id="tax_rate"
                          type="number"
                          step="0.1"
                          value={businessSettings.tax_rate}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            tax_rate: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping_rate">Shipping Rate ($)</Label>
                        <Input
                          id="shipping_rate"
                          type="number"
                          step="0.01"
                          value={businessSettings.shipping_rate}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            shipping_rate: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="free_shipping_threshold">Free Shipping Threshold ($)</Label>
                        <Input
                          id="free_shipping_threshold"
                          type="number"
                          step="0.01"
                          value={businessSettings.free_shipping_threshold}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            free_shipping_threshold: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input
                          id="currency"
                          value={businessSettings.currency}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            currency: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input
                          id="timezone"
                          value={businessSettings.timezone}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            timezone: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_hours">Business Hours</Label>
                      <Input
                        id="business_hours"
                        value={businessSettings.business_hours}
                        onChange={(e) => setBusinessSettings({
                          ...businessSettings,
                          business_hours: e.target.value
                        })}
                      />
                    </div>

                    <Button 
                      onClick={() => saveSettings('business_settings', businessSettings)}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Business Settings'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="enable_order_confirmations"
                          checked={emailSettings.enable_order_confirmations}
                          onCheckedChange={(checked) => setEmailSettings({
                            ...emailSettings,
                            enable_order_confirmations: checked
                          })}
                        />
                        <Label htmlFor="enable_order_confirmations">Enable Order Confirmations</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="enable_shipping_notifications"
                          checked={emailSettings.enable_shipping_notifications}
                          onCheckedChange={(checked) => setEmailSettings({
                            ...emailSettings,
                            enable_shipping_notifications: checked
                          })}
                        />
                        <Label htmlFor="enable_shipping_notifications">Enable Shipping Notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="enable_newsletter"
                          checked={emailSettings.enable_newsletter}
                          onCheckedChange={(checked) => setEmailSettings({
                            ...emailSettings,
                            enable_newsletter: checked
                          })}
                        />
                        <Label htmlFor="enable_newsletter">Enable Newsletter</Label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp_host">SMTP Host</Label>
                        <Input
                          id="smtp_host"
                          value={emailSettings.smtp_host}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtp_host: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp_port">SMTP Port</Label>
                        <Input
                          id="smtp_port"
                          value={emailSettings.smtp_port}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtp_port: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp_username">SMTP Username</Label>
                        <Input
                          id="smtp_username"
                          value={emailSettings.smtp_username}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtp_username: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp_password">SMTP Password</Label>
                        <Input
                          id="smtp_password"
                          type="password"
                          value={emailSettings.smtp_password}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings,
                            smtp_password: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={() => saveSettings('email_settings', emailSettings)}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Email Settings'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}