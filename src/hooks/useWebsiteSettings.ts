import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WebsiteSettings {
  site_title?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  free_shipping_text?: string;
  join_text?: string;
  hero_title?: string;
  hero_subtitle?: string;
  footer_text?: string;
  maintenance_mode?: boolean;
  [key: string]: any;
}

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState<WebsiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('website_settings')
        .select('*');

      if (error) throw error;

      // Convert array of settings to object
      const settingsObject: WebsiteSettings = {};
      data?.forEach(item => {
        settingsObject[item.key] = item.value;
      });

      setSettings(settingsObject);
    } catch (err) {
      console.error('Error fetching website settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
      
      // Set default values on error
      setSettings({
        site_title: 'verified engine',
        site_description: 'Premium automotive engines and parts',
        contact_phone: '719-630-3236',
        free_shipping_text: 'FREE SHIPPING ON SELECT ITEMS!',
        join_text: 'JOIN THE FUN !!',
        hero_title: 'Premium Automotive Engines',
        hero_subtitle: 'Quality engines you can trust',
        footer_text: '© 2024 Verified Engine. All rights reserved.',
        maintenance_mode: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key: string, defaultValue: any = null) => {
    return settings[key] ?? defaultValue;
  };

  const updateSetting = async (key: string, value: any, description?: string) => {
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          key,
          value,
          description: description || null,
        }, {
          onConflict: 'key'
        });

      if (error) throw error;

      // Update local state
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));

      return { success: true };
    } catch (err) {
      console.error('Error updating setting:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update setting' 
      };
    }
  };

  const refreshSettings = () => {
    fetchSettings();
  };

  return {
    settings,
    loading,
    error,
    getSetting,
    updateSetting,
    refreshSettings,
  };
};