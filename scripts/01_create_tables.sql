-- Ankara Fashion Store - Database Schema
-- Created for Kallito Fashion (now Ankara) clothing shop

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ───────────────────────────────────────────────────────
-- 1. CATEGORIES TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  image_url TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

-- ───────────────────────────────────────────────────────
-- 2. TAGS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- ───────────────────────────────────────────────────────
-- 3. PRODUCTS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  is_new BOOLEAN DEFAULT false,
  is_on_offer BOOLEAN DEFAULT false,
  offer_percentage INTEGER,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_on_offer ON products(is_on_offer);
CREATE INDEX idx_products_new ON products(is_new);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_created ON products(created_at);

-- ───────────────────────────────────────────────────────
-- 4. PRODUCT IMAGES TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_images_sort ON product_images(sort_order);

-- ───────────────────────────────────────────────────────
-- 5. PRODUCT VARIATIONS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_variations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  options TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_product_variations_product ON product_variations(product_id);

-- ───────────────────────────────────────────────────────
-- 6. PRODUCT TAGS JUNCTION TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_tags (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

CREATE INDEX idx_product_tags_product ON product_tags(product_id);
CREATE INDEX idx_product_tags_tag ON product_tags(tag_id);

-- ───────────────────────────────────────────────────────
-- 7. DELIVERY LOCATIONS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS delivery_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  fee NUMERIC(10,2) NOT NULL,
  estimated_days VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_delivery_active ON delivery_locations(is_active);

-- ───────────────────────────────────────────────────────
-- 8. ORDERS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_no VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  delivery_location_id UUID REFERENCES delivery_locations(id),
  delivery_address TEXT NOT NULL,
  order_notes TEXT,
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_no ON orders(order_no);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_phone ON orders(customer_phone);

-- ───────────────────────────────────────────────────────
-- 9. ORDER ITEMS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  product_price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  selected_variations JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ───────────────────────────────────────────────────────
-- 10. BANNERS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  image_url TEXT NOT NULL,
  link VARCHAR(255),
  position VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_banners_position ON banners(position);
CREATE INDEX idx_banners_active ON banners(is_active);

-- ───────────────────────────────────────────────────────
-- 11. NAVBAR OFFERS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS navbar_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_navbar_offers_active ON navbar_offers(is_active);

-- ───────────────────────────────────────────────────────
-- 12. POPUP OFFERS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS popup_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_label VARCHAR(100) NOT NULL,
  image_url TEXT,
  link VARCHAR(255),
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_popup_offers_active ON popup_offers(is_active);

-- ───────────────────────────────────────────────────────
-- 13. NEWSLETTER SUBSCRIBERS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);

-- ───────────────────────────────────────────────────────
-- 14. ANALYTICS EVENTS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  product_id UUID REFERENCES products(id),
  session_id VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_product ON analytics_events(product_id);

-- ───────────────────────────────────────────────────────
-- 15. ADMIN USERS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);

-- ───────────────────────────────────────────────────────
-- 16. SITE SETTINGS TABLE
-- ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_name VARCHAR(255),
  store_email VARCHAR(255),
  store_phone VARCHAR(50),
  whatsapp_number VARCHAR(20),
  currency_symbol VARCHAR(10) DEFAULT 'KSh',
  free_shipping_threshold NUMERIC(10,2) DEFAULT 5000,
  order_prefix VARCHAR(10) DEFAULT 'KF',
  enable_whatsapp_checkout BOOLEAN DEFAULT true,
  enable_quick_checkout BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  site_title VARCHAR(255),
  site_description TEXT,
  meta_keywords TEXT,
  canonical_url VARCHAR(500),
  og_image_url TEXT,
  google_analytics_id VARCHAR(50),
  facebook_pixel_id VARCHAR(50),
  robots_txt TEXT,
  primary_color VARCHAR(20) DEFAULT '#DC7A40',
  accent_color VARCHAR(20) DEFAULT '#1a1a1a',
  font_heading VARCHAR(100) DEFAULT 'Playfair Display',
  font_body VARCHAR(100) DEFAULT 'Inter',
  logo_text VARCHAR(255) DEFAULT 'Ankara Fashion',
  logo_image_url TEXT,
  favicon_url TEXT,
  show_recent_purchase BOOLEAN DEFAULT true,
  show_offer_modal BOOLEAN DEFAULT true,
  show_newsletter BOOLEAN DEFAULT true,
  footer_description TEXT,
  footer_address TEXT,
  footer_phone VARCHAR(50),
  footer_email VARCHAR(255),
  footer_whatsapp VARCHAR(20),
  footer_instagram VARCHAR(500),
  footer_tiktok VARCHAR(500),
  footer_twitter VARCHAR(500),
  footer_open_hours VARCHAR(255),
  footer_dispatch_days VARCHAR(255),
  copyright_text VARCHAR(255),
  show_privacy_policy BOOLEAN DEFAULT true,
  show_terms BOOLEAN DEFAULT true,
  show_refund_policy BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────────────
-- Create updated_at triggers for automatic timestamp updates
-- ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER delivery_locations_updated_at BEFORE UPDATE ON delivery_locations
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER banners_updated_at BEFORE UPDATE ON banners
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER popup_offers_updated_at BEFORE UPDATE ON popup_offers
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER admin_users_updated_at BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
