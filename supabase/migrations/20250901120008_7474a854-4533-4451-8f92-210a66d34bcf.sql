-- Insert default payment settings
INSERT INTO website_settings (key, value, description) 
VALUES (
  'payment_settings',
  '{
    "stripe_enabled": true,
    "paypal_enabled": true,
    "stripe_publishable_key": "",
    "stripe_secret_key": "",
    "paypal_client_id": "",
    "paypal_client_secret": "",
    "test_mode": true
  }'::jsonb,
  'Payment gateway configuration settings'
) ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();