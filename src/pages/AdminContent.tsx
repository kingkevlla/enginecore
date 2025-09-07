import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Save, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  key: string;
  value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface SiteSettings {
  site_title: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  free_shipping_text: string;
  join_text: string;
  hero_title: string;
  hero_subtitle: string;
  footer_text: string;
  maintenance_mode: boolean;
}

export default function AdminContent() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: "verified engine",
    site_description: "Premium automotive engines and parts",
    contact_email: "info@verifiedengine.com",
    contact_phone: "719-630-3236",
    social_facebook: "",
    social_instagram: "",
    social_twitter: "",
    free_shipping_text: "FREE SHIPPING ON SELECT ITEMS!",
    join_text: "JOIN THE FUN !!",
    hero_title: "Premium Automotive Engines",
    hero_subtitle: "Quality engines you can trust",
    footer_text: "© 2024 Verified Engine. All rights reserved.",
    maintenance_mode: false,
  });
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .order('key');

      if (error) throw error;

      setContentItems(data || []);
      
      // Populate settings from fetched data
      const settingsMap: any = {};
      data?.forEach(item => {
        settingsMap[item.key] = item.value;
      });

      setSettings(prev => ({
        ...prev,
        ...settingsMap
      }));

    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Convert settings to individual items for storage
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        description: getDescriptionForKey(key),
      }));

      for (const item of updates) {
        const { error } = await supabase
          .from('website_settings')
          .upsert(item, {
            onConflict: 'key'
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });

      fetchContent();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addCustomContent = async () => {
    if (!newKey.trim() || !newValue.trim()) {
      toast({
        title: "Error",
        description: "Key and value are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('website_settings')
        .insert({
          key: newKey,
          value: newValue,
          description: newDescription || null,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content added successfully",
      });

      setNewKey("");
      setNewValue("");
      setNewDescription("");
      fetchContent();
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive",
      });
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('website_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content deleted successfully",
      });

      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const getDescriptionForKey = (key: string): string => {
    const descriptions: Record<string, string> = {
      site_title: "Main website title shown in header",
      site_description: "Site description for SEO and meta tags",
      contact_email: "Primary contact email address",
      contact_phone: "Contact phone number shown in header",
      social_facebook: "Facebook page URL",
      social_instagram: "Instagram profile URL",
      social_twitter: "Twitter profile URL",
      free_shipping_text: "Text shown in top banner",
      join_text: "Subtitle text under logo",
      hero_title: "Main title on homepage hero section",
      hero_subtitle: "Subtitle on homepage hero section",
      footer_text: "Copyright text in footer",
      maintenance_mode: "Enable to show maintenance page",
    };
    return descriptions[key] || "";
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="bg-background border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Website Content Management</h1>
                  <p className="text-gray-500 mt-2">Manage your website content, settings, and text</p>
                </div>
              </div>
              <Button onClick={saveSettings} disabled={saving} className="bg-orange-500 hover:bg-orange-600">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save All Changes"}
              </Button>
            </div>
          </header>

          <div className="p-8">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General Settings</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
                <TabsTrigger value="content">Page Content</TabsTrigger>
                <TabsTrigger value="custom">Custom Content</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Site Identity</CardTitle>
                    <CardDescription>Basic website information and branding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="site_title">Site Title</Label>
                      <Input
                        id="site_title"
                        value={settings.site_title}
                        onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                        placeholder="Enter site title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="site_description">Site Description</Label>
                      <Textarea
                        id="site_description"
                        value={settings.site_description}
                        onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                        placeholder="Enter site description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="join_text">Tagline Text</Label>
                      <Input
                        id="join_text"
                        value={settings.join_text}
                        onChange={(e) => setSettings(prev => ({ ...prev, join_text: e.target.value }))}
                        placeholder="JOIN THE FUN !!"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="maintenance_mode"
                        checked={settings.maintenance_mode}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenance_mode: checked }))}
                      />
                      <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Banner Settings</CardTitle>
                    <CardDescription>Configure top banner and promotional text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="free_shipping_text">Banner Text</Label>
                      <Input
                        id="free_shipping_text"
                        value={settings.free_shipping_text}
                        onChange={(e) => setSettings(prev => ({ ...prev, free_shipping_text: e.target.value }))}
                        placeholder="FREE SHIPPING ON SELECT ITEMS!"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update your business contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact_email">Contact Email</Label>
                        <Input
                          id="contact_email"
                          type="email"
                          value={settings.contact_email}
                          onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                          placeholder="info@verifiedengine.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact_phone">Contact Phone</Label>
                        <Input
                          id="contact_phone"
                          value={settings.contact_phone}
                          onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                          placeholder="719-630-3236"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Configure social media links</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="social_facebook">Facebook URL</Label>
                      <Input
                        id="social_facebook"
                        value={settings.social_facebook}
                        onChange={(e) => setSettings(prev => ({ ...prev, social_facebook: e.target.value }))}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="social_instagram">Instagram URL</Label>
                      <Input
                        id="social_instagram"
                        value={settings.social_instagram}
                        onChange={(e) => setSettings(prev => ({ ...prev, social_instagram: e.target.value }))}
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>
                    <div>
                      <Label htmlFor="social_twitter">Twitter URL</Label>
                      <Input
                        id="social_twitter"
                        value={settings.social_twitter}
                        onChange={(e) => setSettings(prev => ({ ...prev, social_twitter: e.target.value }))}
                        placeholder="https://twitter.com/yourprofile"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Homepage Content</CardTitle>
                    <CardDescription>Edit main page content and messaging</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hero_title">Hero Section Title</Label>
                      <Input
                        id="hero_title"
                        value={settings.hero_title}
                        onChange={(e) => setSettings(prev => ({ ...prev, hero_title: e.target.value }))}
                        placeholder="Premium Automotive Engines"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero_subtitle">Hero Section Subtitle</Label>
                      <Input
                        id="hero_subtitle"
                        value={settings.hero_subtitle}
                        onChange={(e) => setSettings(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                        placeholder="Quality engines you can trust"
                      />
                    </div>
                    <div>
                      <Label htmlFor="footer_text">Footer Text</Label>
                      <Input
                        id="footer_text"
                        value={settings.footer_text}
                        onChange={(e) => setSettings(prev => ({ ...prev, footer_text: e.target.value }))}
                        placeholder="© 2024 Verified Engine. All rights reserved."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Custom Content</CardTitle>
                    <CardDescription>Create custom content entries for your website</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new_key">Content Key</Label>
                        <Input
                          id="new_key"
                          value={newKey}
                          onChange={(e) => setNewKey(e.target.value)}
                          placeholder="e.g., about_us_text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_description">Description (Optional)</Label>
                        <Input
                          id="new_description"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="What is this content for?"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new_value">Content Value</Label>
                      <Textarea
                        id="new_value"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Enter the content text or data"
                        rows={3}
                      />
                    </div>
                    <Button onClick={addCustomContent} className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Content
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Existing Custom Content</CardTitle>
                    <CardDescription>Manage all custom content entries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contentItems.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No custom content entries found</p>
                      ) : (
                        contentItems.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4 bg-white">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline">{item.key}</Badge>
                                  <span className="text-sm text-gray-500">
                                    {new Date(item.updated_at).toLocaleDateString()}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                )}
                                <p className="text-sm">{String(item.value).substring(0, 100)}...</p>
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteContent(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
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