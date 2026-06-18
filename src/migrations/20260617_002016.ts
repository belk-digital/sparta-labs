import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('customer', 'admin', 'staff');
  CREATE TYPE "public"."enum_users_preferred_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'active', 'archived');
  CREATE TYPE "public"."enum_coupons_type" AS ENUM('percentage', 'fixed_amount', 'free_shipping', 'buy_one_get_one', 'store_credit');
  CREATE TYPE "public"."enum_coupons_applicable_product_types" AS ENUM('all', 'normal_only', 'bulk_only');
  CREATE TYPE "public"."enum_coupons_applies_to" AS ENUM('all', 'specific_products', 'specific_categories');
  CREATE TYPE "public"."enum_orders_notes_type" AS ENUM('internal', 'customer');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'paid', 'fulfilled', 'shipped', 'completed', 'refunded', 'cancelled');
  CREATE TYPE "public"."enum_orders_payment_status" AS ENUM('unpaid', 'authorized', 'captured', 'refunded');
  CREATE TYPE "public"."enum_orders_fulfillment_status" AS ENUM('unfulfilled', 'partial', 'fulfilled');
  CREATE TYPE "public"."enum_reviews_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_email_logs_status" AS ENUM('sent', 'failed');
  CREATE TYPE "public"."enum_affiliate_applications_social_links_platform" AS ENUM('instagram', 'youtube', 'tiktok', 'twitter', 'reddit');
  CREATE TYPE "public"."enum_affiliate_applications_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_affiliate_applications_estimated_monthly_reach" AS ENUM('<1k', '1k-10k', '10k-100k', '100k+');
  CREATE TYPE "public"."enum_affiliates_social_links_platform" AS ENUM('instagram', 'youtube', 'tiktok', 'twitter', 'reddit');
  CREATE TYPE "public"."enum_affiliates_payout_methods_type" AS ENUM('paypal', 'wise', 'bank_wire', 'crypto_btc', 'crypto_eth', 'crypto_usdt_erc20', 'crypto_usdt_trc20', 'store_credit');
  CREATE TYPE "public"."enum_affiliates_status" AS ENUM('pending', 'approved', 'rejected', 'suspended');
  CREATE TYPE "public"."enum_affiliates_commission_type" AS ENUM('percentage', 'fixed_amount');
  CREATE TYPE "public"."enum_affiliates_commission_on" AS ENUM('subtotal_after_coupon', 'subtotal_before_coupon');
  CREATE TYPE "public"."enum_affiliates_tier" AS ENUM('standard', 'silver', 'gold', 'vip');
  CREATE TYPE "public"."enum_affiliates_payout_currency" AS ENUM('USD', 'BTC', 'ETH', 'USDT_ERC20', 'USDT_TRC20', 'STORE_CREDIT');
  CREATE TYPE "public"."enum_affiliate_clicks_source" AS ENUM('referral_link', 'coupon_code_attempt');
  CREATE TYPE "public"."enum_affiliate_clicks_device_type" AS ENUM('desktop', 'mobile', 'tablet');
  CREATE TYPE "public"."enum_affiliate_conversions_attribution_source" AS ENUM('referral_link', 'coupon_code', 'both');
  CREATE TYPE "public"."enum_affiliate_conversions_status" AS ENUM('pending', 'approved', 'paid', 'reversed', 'voided');
  CREATE TYPE "public"."enum_affiliate_conversions_reversed_reason" AS ENUM('order_refunded', 'order_cancelled', 'fraud_detected', 'self_referral', 'admin_manual');
  CREATE TYPE "public"."enum_affiliate_payouts_currency" AS ENUM('USD', 'BTC', 'ETH', 'USDT');
  CREATE TYPE "public"."enum_affiliate_payouts_payment_method" AS ENUM('paypal', 'wise', 'bank_wire', 'crypto_btc', 'crypto_eth', 'crypto_usdt_erc20', 'crypto_usdt_trc20', 'store_credit');
  CREATE TYPE "public"."enum_affiliate_payouts_status" AS ENUM('draft', 'processing', 'paid', 'failed');
  CREATE TYPE "public"."enum_payout_requests_payout_method" AS ENUM('zelle', 'cashapp', 'applepay');
  CREATE TYPE "public"."enum_payout_requests_status" AS ENUM('pending', 'approved', 'paid', 'rejected');
  CREATE TYPE "public"."enum_processing_fees_type" AS ENUM('fixed_amount', 'percentage');
  CREATE TYPE "public"."enum_affiliate_settings_default_commission_type" AS ENUM('percentage', 'fixed_amount');
  CREATE TYPE "public"."enum_affiliate_settings_default_commission_on" AS ENUM('subtotal_after_coupon', 'subtotal_before_coupon');
  CREATE TABLE "trash" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"collection_slug" varchar NOT NULL,
  	"original_id" varchar NOT NULL,
  	"document_data" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "order_counters" (
  	"id" numeric PRIMARY KEY NOT NULL,
  	"counter" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"clerk_user_id" varchar,
  	"phone" varchar,
  	"role" "enum_users_role" DEFAULT 'customer',
  	"email_verified" boolean DEFAULT false,
  	"accepts_marketing" boolean DEFAULT false,
  	"preferred_locale" "enum_users_preferred_locale" DEFAULT 'en',
  	"date_of_birth" timestamp(3) with time zone,
  	"stripe_customer_id" varchar,
  	"default_shipping_address_id" integer,
  	"default_billing_address_id" integer,
  	"last_login_at" timestamp(3) with time zone,
  	"metadata" jsonb,
  	"maxx_points" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "addresses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"company" varchar,
  	"line1" varchar NOT NULL,
  	"line2" varchar,
  	"city" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"postal_code" varchar NOT NULL,
  	"country" varchar DEFAULT 'US' NOT NULL,
  	"phone" varchar NOT NULL,
  	"is_default_shipping" boolean DEFAULT false,
  	"is_default_billing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"slug" varchar,
  	"parent_id" integer,
  	"is_visible" boolean DEFAULT true,
  	"sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "products_variants_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sku" varchar NOT NULL,
  	"image_id" integer,
  	"price" numeric NOT NULL,
  	"sale_price" numeric,
  	"stock" numeric NOT NULL
  );
  
  CREATE TABLE "products_bulk_bundles_variant_overrides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_sku" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"sale_price" numeric
  );
  
  CREATE TABLE "products_bulk_bundles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"discount_percentage" numeric,
  	"price" numeric,
  	"sale_price" numeric,
  	"image_id" integer
  );
  
  CREATE TABLE "products_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"slug" varchar,
  	"sku" varchar,
  	"price" numeric DEFAULT 0 NOT NULL,
  	"sale_price" numeric,
  	"stock" numeric DEFAULT 0 NOT NULL,
  	"weight" numeric,
  	"dimensions_length" numeric,
  	"dimensions_width" numeric,
  	"dimensions_height" numeric,
  	"has_variants" boolean DEFAULT false,
  	"average_rating" numeric DEFAULT 0,
  	"review_count" numeric DEFAULT 0,
  	"product_details_title" varchar DEFAULT 'Product Details',
  	"product_details_description" varchar,
  	"research_focus_title" varchar DEFAULT 'Research Focus & Mechanism Overview',
  	"research_focus_description" varchar,
  	"quality_purity_title" varchar DEFAULT 'Quality & Purity Standards',
  	"quality_purity_description" varchar,
  	"compliance_notice_title" varchar DEFAULT 'Compliance Notice',
  	"compliance_notice_description" varchar,
  	"coa_file_id" integer,
  	"status" "enum_products_status" DEFAULT 'draft',
  	"is_visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "carts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_sku" varchar NOT NULL,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"added_at" timestamp(3) with time zone NOT NULL,
  	"price_snapshot" numeric NOT NULL
  );
  
  CREATE TABLE "carts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "wishlists_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_sku" varchar NOT NULL,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"added_at" timestamp(3) with time zone NOT NULL,
  	"price_snapshot" numeric NOT NULL
  );
  
  CREATE TABLE "wishlists" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_name" varchar,
  	"user_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "coupons_locked_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "coupons_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE "coupons_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" integer
  );
  
  CREATE TABLE "coupons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"usage_count" numeric DEFAULT 0,
  	"free_shipping" boolean DEFAULT false,
  	"type" "enum_coupons_type" NOT NULL,
  	"min_spend" numeric,
  	"usage_limit" numeric,
  	"stackable" boolean DEFAULT false,
  	"expires_at" timestamp(3) with time zone,
  	"exclude_sale_items" boolean DEFAULT false,
  	"auto_apply" boolean DEFAULT false,
  	"store_credit_amount" numeric,
  	"remaining_balance" numeric,
  	"value" numeric,
  	"applicable_product_types" "enum_coupons_applicable_product_types" DEFAULT 'all' NOT NULL,
  	"applies_to" "enum_coupons_applies_to" DEFAULT 'all' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant" varchar,
  	"price" numeric,
  	"quantity" numeric NOT NULL,
  	"product_snapshot" jsonb
  );
  
  CREATE TABLE "orders_refunds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amount" numeric,
  	"reason" varchar,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "orders_applied_fees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"fee_id_id" integer,
  	"fee_name" varchar,
  	"amount" numeric
  );
  
  CREATE TABLE "orders_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_orders_notes_type" DEFAULT 'internal' NOT NULL,
  	"note" varchar NOT NULL,
  	"date" timestamp(3) with time zone,
  	"is_emailed" boolean
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order_number" varchar,
  	"owner_id" integer,
  	"customer_first_name" varchar,
  	"customer_last_name" varchar,
  	"customer_phone" varchar,
  	"shipping_address_line1" varchar,
  	"shipping_address_line2" varchar,
  	"shipping_address_city" varchar,
  	"shipping_address_state" varchar,
  	"shipping_address_postal_code" varchar,
  	"shipping_address_country" varchar,
  	"billing_address_line1" varchar,
  	"billing_address_line2" varchar,
  	"billing_address_city" varchar,
  	"billing_address_state" varchar,
  	"billing_address_postal_code" varchar,
  	"billing_address_country" varchar,
  	"status" "enum_orders_status" DEFAULT 'pending' NOT NULL,
  	"payment_status" "enum_orders_payment_status" DEFAULT 'unpaid' NOT NULL,
  	"fulfillment_status" "enum_orders_fulfillment_status" DEFAULT 'unfulfilled' NOT NULL,
  	"subtotal" numeric,
  	"discount_total" numeric,
  	"redeemed_points" numeric DEFAULT 0,
  	"shipping_total" numeric DEFAULT 0,
  	"tax_total" numeric DEFAULT 0 NOT NULL,
  	"fee_total" numeric DEFAULT 0 NOT NULL,
  	"total" numeric DEFAULT 0 NOT NULL,
  	"shipping_method" varchar,
  	"coupon_code" varchar,
  	"customer_note" varchar,
  	"guest_email" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"user_id" integer NOT NULL,
  	"order_id" integer,
  	"rating" numeric NOT NULL,
  	"comment" varchar,
  	"verified_purchase" boolean DEFAULT false,
  	"status" "enum_reviews_status" DEFAULT 'pending',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shippingzones_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"method" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"estimated_days" numeric,
  	"min_order_amount" numeric
  );
  
  CREATE TABLE "shippingzones" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"author_id" integer NOT NULL,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"status" "enum_blog_posts_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"content" jsonb,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"subject" varchar,
  	"message" varchar NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"sent_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_email_logs_status" DEFAULT 'sent',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliate_applications_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_affiliate_applications_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "affiliate_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"status" "enum_affiliate_applications_status" DEFAULT 'pending',
  	"display_name" varchar NOT NULL,
  	"website_url" varchar,
  	"promotion_methods" varchar NOT NULL,
  	"estimated_monthly_reach" "enum_affiliate_applications_estimated_monthly_reach",
  	"niche" varchar,
  	"why_join" varchar,
  	"agreed_to_terms" boolean DEFAULT false NOT NULL,
  	"reviewed_by_id" integer,
  	"reviewed_at" timestamp(3) with time zone,
  	"review_notes" varchar,
  	"linked_affiliate_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliates_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_affiliates_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "affiliates_payout_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_affiliates_payout_methods_type",
  	"is_primary" boolean,
  	"paypal_email" varchar,
  	"wallet_address" varchar,
  	"wallet_network" varchar
  );
  
  CREATE TABLE "affiliates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"status" "enum_affiliates_status" DEFAULT 'pending',
  	"application_date" timestamp(3) with time zone,
  	"approved_at" timestamp(3) with time zone,
  	"approved_by_id" integer,
  	"suspended_at" timestamp(3) with time zone,
  	"suspension_reason" varchar,
  	"display_name" varchar,
  	"website_url" varchar,
  	"parent_affiliate_id" integer,
  	"referral_slug" varchar,
  	"coupon_code" varchar,
  	"coupon_id" integer,
  	"cookie_duration_days" numeric DEFAULT 30,
  	"commission_rate" numeric,
  	"commission_type" "enum_affiliates_commission_type",
  	"customer_discount" numeric DEFAULT 10,
  	"pending_period_days" numeric,
  	"commission_on" "enum_affiliates_commission_on",
  	"tier" "enum_affiliates_tier" DEFAULT 'standard',
  	"total_clicks" numeric DEFAULT 0,
  	"unique_clicks" numeric DEFAULT 0,
  	"total_conversions" numeric DEFAULT 0,
  	"total_revenue" numeric DEFAULT 0,
  	"total_commission_earned" numeric DEFAULT 0,
  	"total_commission_pending" numeric DEFAULT 0,
  	"total_commission_approved" numeric DEFAULT 0,
  	"total_commission_requested" numeric DEFAULT 0,
  	"total_commission_paid" numeric DEFAULT 0,
  	"minimum_payout_threshold" numeric,
  	"payout_currency" "enum_affiliates_payout_currency" DEFAULT 'USD',
  	"flagged_for_review" boolean,
  	"fraud_score" numeric,
  	"fraud_notes" varchar,
  	"admin_notes" varchar,
  	"agreed_to_terms_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliate_clicks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"affiliate_id" integer NOT NULL,
  	"source" "enum_affiliate_clicks_source",
  	"ip_hash" varchar,
  	"ip_country" varchar,
  	"user_agent" varchar,
  	"device_type" "enum_affiliate_clicks_device_type",
  	"referrer" varchar,
  	"landing_page" varchar,
  	"session_id" varchar,
  	"converted_to_order" boolean DEFAULT false,
  	"conversion_id" integer,
  	"conversion_value" numeric,
  	"is_suspicious" boolean DEFAULT false,
  	"suspicion_reason" varchar,
  	"clicked_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliate_conversions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"affiliate_id" integer NOT NULL,
  	"order_id" integer NOT NULL,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"attribution_source" "enum_affiliate_conversions_attribution_source",
  	"attribution_click_id" integer,
  	"cookie_age_days" numeric,
  	"coupon_code_used" varchar,
  	"order_subtotal" numeric,
  	"order_discount" numeric,
  	"eligible_subtotal" numeric,
  	"commission_rate" numeric,
  	"commission_amount" numeric,
  	"status" "enum_affiliate_conversions_status",
  	"pending_until" timestamp(3) with time zone,
  	"approved_at" timestamp(3) with time zone,
  	"payout_id" integer,
  	"paid_at" timestamp(3) with time zone,
  	"reversed_at" timestamp(3) with time zone,
  	"reversed_reason" "enum_affiliate_conversions_reversed_reason",
  	"reversed_by_id" integer,
  	"self_referral_detected" boolean,
  	"ip_matches_affiliate" boolean,
  	"fraud_score" numeric,
  	"flagged_for_review" boolean,
  	"fraud_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliate_payouts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"affiliate_id" integer NOT NULL,
  	"conversion_count" numeric,
  	"total_amount_cents" numeric NOT NULL,
  	"currency" "enum_affiliate_payouts_currency",
  	"crypto_amount_raw" varchar,
  	"exchange_rate_used" numeric,
  	"payment_method" "enum_affiliate_payouts_payment_method",
  	"payment_destination" jsonb,
  	"status" "enum_affiliate_payouts_status" DEFAULT 'draft',
  	"created_by_id" integer,
  	"processed_by_id" integer,
  	"admin_notes" varchar,
  	"transaction_id" varchar,
  	"receipt_file_id" integer,
  	"receipt_url" varchar,
  	"exported_at" timestamp(3) with time zone,
  	"paid_at" timestamp(3) with time zone,
  	"failed_at" timestamp(3) with time zone,
  	"failure_reason" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliate_payouts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"affiliate_conversions_id" integer
  );
  
  CREATE TABLE "payout_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"affiliate_id" integer NOT NULL,
  	"amount_cents" numeric NOT NULL,
  	"payout_method" "enum_payout_requests_payout_method" NOT NULL,
  	"payout_details" varchar NOT NULL,
  	"status" "enum_payout_requests_status" DEFAULT 'pending' NOT NULL,
  	"processed_at" timestamp(3) with time zone,
  	"processed_by_id" integer,
  	"admin_notes" varchar,
  	"rejection_reason" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "processing_fees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"amount" numeric NOT NULL,
  	"type" "enum_processing_fees_type" DEFAULT 'fixed_amount' NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"is_optional" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"trash_id" integer,
  	"order_counters_id" numeric,
  	"users_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"addresses_id" integer,
  	"categories_id" integer,
  	"products_id" integer,
  	"carts_id" integer,
  	"wishlists_id" integer,
  	"coupons_id" integer,
  	"orders_id" integer,
  	"reviews_id" integer,
  	"shippingzones_id" integer,
  	"blog_posts_id" integer,
  	"pages_id" integer,
  	"contact_messages_id" integer,
  	"email_logs_id" integer,
  	"affiliate_applications_id" integer,
  	"affiliates_id" integer,
  	"affiliate_clicks_id" integer,
  	"affiliate_conversions_id" integer,
  	"affiliate_payouts_id" integer,
  	"payout_requests_id" integer,
  	"processing_fees_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliate_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_commission_rate" numeric DEFAULT 10 NOT NULL,
  	"default_commission_type" "enum_affiliate_settings_default_commission_type" DEFAULT 'percentage' NOT NULL,
  	"default_commission_on" "enum_affiliate_settings_default_commission_on" DEFAULT 'subtotal_after_coupon' NOT NULL,
  	"default_cookie_duration_days" numeric DEFAULT 30 NOT NULL,
  	"default_pending_period_days" numeric DEFAULT 30 NOT NULL,
  	"default_minimum_payout_threshold" numeric DEFAULT 5000 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_default_shipping_address_id_addresses_id_fk" FOREIGN KEY ("default_shipping_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_default_billing_address_id_addresses_id_fk" FOREIGN KEY ("default_billing_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_options" ADD CONSTRAINT "products_variants_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_bulk_bundles_variant_overrides" ADD CONSTRAINT "products_bulk_bundles_variant_overrides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_bulk_bundles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_bulk_bundles" ADD CONSTRAINT "products_bulk_bundles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_bulk_bundles" ADD CONSTRAINT "products_bulk_bundles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_faqs" ADD CONSTRAINT "products_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_coa_file_id_documents_id_fk" FOREIGN KEY ("coa_file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wishlists_items" ADD CONSTRAINT "wishlists_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wishlists_items" ADD CONSTRAINT "wishlists_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "coupons_locked_emails" ADD CONSTRAINT "coupons_locked_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coupons_products" ADD CONSTRAINT "coupons_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "coupons_products" ADD CONSTRAINT "coupons_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coupons_categories" ADD CONSTRAINT "coupons_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "coupons_categories" ADD CONSTRAINT "coupons_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_refunds" ADD CONSTRAINT "orders_refunds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_applied_fees" ADD CONSTRAINT "orders_applied_fees_fee_id_id_processing_fees_id_fk" FOREIGN KEY ("fee_id_id") REFERENCES "public"."processing_fees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_applied_fees" ADD CONSTRAINT "orders_applied_fees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_notes" ADD CONSTRAINT "orders_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shippingzones_methods" ADD CONSTRAINT "shippingzones_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shippingzones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_applications_social_links" ADD CONSTRAINT "affiliate_applications_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."affiliate_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "affiliate_applications" ADD CONSTRAINT "affiliate_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_applications" ADD CONSTRAINT "affiliate_applications_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_applications" ADD CONSTRAINT "affiliate_applications_linked_affiliate_id_affiliates_id_fk" FOREIGN KEY ("linked_affiliate_id") REFERENCES "public"."affiliates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliates_social_links" ADD CONSTRAINT "affiliates_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."affiliates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "affiliates_payout_methods" ADD CONSTRAINT "affiliates_payout_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."affiliates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_approved_by_id_users_id_fk" FOREIGN KEY ("approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_parent_affiliate_id_affiliates_id_fk" FOREIGN KEY ("parent_affiliate_id") REFERENCES "public"."affiliates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_coupon_id_coupons_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_affiliate_id_affiliates_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_conversion_id_affiliate_conversions_id_fk" FOREIGN KEY ("conversion_id") REFERENCES "public"."affiliate_conversions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_conversions" ADD CONSTRAINT "affiliate_conversions_affiliate_id_affiliates_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_conversions" ADD CONSTRAINT "affiliate_conversions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_conversions" ADD CONSTRAINT "affiliate_conversions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_conversions" ADD CONSTRAINT "affiliate_conversions_attribution_click_id_affiliate_clicks_id_fk" FOREIGN KEY ("attribution_click_id") REFERENCES "public"."affiliate_clicks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_conversions" ADD CONSTRAINT "affiliate_conversions_payout_id_affiliate_payouts_id_fk" FOREIGN KEY ("payout_id") REFERENCES "public"."affiliate_payouts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_conversions" ADD CONSTRAINT "affiliate_conversions_reversed_by_id_users_id_fk" FOREIGN KEY ("reversed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_payouts" ADD CONSTRAINT "affiliate_payouts_affiliate_id_affiliates_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_payouts" ADD CONSTRAINT "affiliate_payouts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_payouts" ADD CONSTRAINT "affiliate_payouts_processed_by_id_users_id_fk" FOREIGN KEY ("processed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_payouts" ADD CONSTRAINT "affiliate_payouts_receipt_file_id_media_id_fk" FOREIGN KEY ("receipt_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_payouts_rels" ADD CONSTRAINT "affiliate_payouts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."affiliate_payouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "affiliate_payouts_rels" ADD CONSTRAINT "affiliate_payouts_rels_affiliate_conversions_fk" FOREIGN KEY ("affiliate_conversions_id") REFERENCES "public"."affiliate_conversions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payout_requests" ADD CONSTRAINT "payout_requests_affiliate_id_affiliates_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payout_requests" ADD CONSTRAINT "payout_requests_processed_by_id_users_id_fk" FOREIGN KEY ("processed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trash_fk" FOREIGN KEY ("trash_id") REFERENCES "public"."trash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_order_counters_fk" FOREIGN KEY ("order_counters_id") REFERENCES "public"."order_counters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wishlists_fk" FOREIGN KEY ("wishlists_id") REFERENCES "public"."wishlists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_coupons_fk" FOREIGN KEY ("coupons_id") REFERENCES "public"."coupons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shippingzones_fk" FOREIGN KEY ("shippingzones_id") REFERENCES "public"."shippingzones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk" FOREIGN KEY ("contact_messages_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_logs_fk" FOREIGN KEY ("email_logs_id") REFERENCES "public"."email_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliate_applications_fk" FOREIGN KEY ("affiliate_applications_id") REFERENCES "public"."affiliate_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliates_fk" FOREIGN KEY ("affiliates_id") REFERENCES "public"."affiliates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliate_clicks_fk" FOREIGN KEY ("affiliate_clicks_id") REFERENCES "public"."affiliate_clicks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliate_conversions_fk" FOREIGN KEY ("affiliate_conversions_id") REFERENCES "public"."affiliate_conversions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliate_payouts_fk" FOREIGN KEY ("affiliate_payouts_id") REFERENCES "public"."affiliate_payouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payout_requests_fk" FOREIGN KEY ("payout_requests_id") REFERENCES "public"."payout_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_processing_fees_fk" FOREIGN KEY ("processing_fees_id") REFERENCES "public"."processing_fees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "trash_updated_at_idx" ON "trash" USING btree ("updated_at");
  CREATE INDEX "trash_created_at_idx" ON "trash" USING btree ("created_at");
  CREATE INDEX "order_counters_updated_at_idx" ON "order_counters" USING btree ("updated_at");
  CREATE INDEX "order_counters_created_at_idx" ON "order_counters" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "users_clerk_user_id_idx" ON "users" USING btree ("clerk_user_id");
  CREATE INDEX "users_default_shipping_address_idx" ON "users" USING btree ("default_shipping_address_id");
  CREATE INDEX "users_default_billing_address_idx" ON "users" USING btree ("default_billing_address_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "addresses_user_idx" ON "addresses" USING btree ("user_id");
  CREATE INDEX "addresses_updated_at_idx" ON "addresses" USING btree ("updated_at");
  CREATE INDEX "addresses_created_at_idx" ON "addresses" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE INDEX "products_variants_options_order_idx" ON "products_variants_options" USING btree ("_order");
  CREATE INDEX "products_variants_options_parent_id_idx" ON "products_variants_options" USING btree ("_parent_id");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE INDEX "products_variants_image_idx" ON "products_variants" USING btree ("image_id");
  CREATE INDEX "products_bulk_bundles_variant_overrides_order_idx" ON "products_bulk_bundles_variant_overrides" USING btree ("_order");
  CREATE INDEX "products_bulk_bundles_variant_overrides_parent_id_idx" ON "products_bulk_bundles_variant_overrides" USING btree ("_parent_id");
  CREATE INDEX "products_bulk_bundles_order_idx" ON "products_bulk_bundles" USING btree ("_order");
  CREATE INDEX "products_bulk_bundles_parent_id_idx" ON "products_bulk_bundles" USING btree ("_parent_id");
  CREATE INDEX "products_bulk_bundles_image_idx" ON "products_bulk_bundles" USING btree ("image_id");
  CREATE INDEX "products_faqs_order_idx" ON "products_faqs" USING btree ("_order");
  CREATE INDEX "products_faqs_parent_id_idx" ON "products_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_coa_file_idx" ON "products" USING btree ("coa_file_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_categories_id_idx" ON "products_rels" USING btree ("categories_id");
  CREATE INDEX "carts_items_order_idx" ON "carts_items" USING btree ("_order");
  CREATE INDEX "carts_items_parent_id_idx" ON "carts_items" USING btree ("_parent_id");
  CREATE INDEX "carts_items_product_idx" ON "carts_items" USING btree ("product_id");
  CREATE UNIQUE INDEX "carts_user_idx" ON "carts" USING btree ("user_id");
  CREATE INDEX "carts_updated_at_idx" ON "carts" USING btree ("updated_at");
  CREATE INDEX "carts_created_at_idx" ON "carts" USING btree ("created_at");
  CREATE INDEX "wishlists_items_order_idx" ON "wishlists_items" USING btree ("_order");
  CREATE INDEX "wishlists_items_parent_id_idx" ON "wishlists_items" USING btree ("_parent_id");
  CREATE INDEX "wishlists_items_product_idx" ON "wishlists_items" USING btree ("product_id");
  CREATE UNIQUE INDEX "wishlists_user_idx" ON "wishlists" USING btree ("user_id");
  CREATE INDEX "wishlists_updated_at_idx" ON "wishlists" USING btree ("updated_at");
  CREATE INDEX "wishlists_created_at_idx" ON "wishlists" USING btree ("created_at");
  CREATE INDEX "coupons_locked_emails_order_idx" ON "coupons_locked_emails" USING btree ("_order");
  CREATE INDEX "coupons_locked_emails_parent_id_idx" ON "coupons_locked_emails" USING btree ("_parent_id");
  CREATE INDEX "coupons_products_order_idx" ON "coupons_products" USING btree ("_order");
  CREATE INDEX "coupons_products_parent_id_idx" ON "coupons_products" USING btree ("_parent_id");
  CREATE INDEX "coupons_products_product_idx" ON "coupons_products" USING btree ("product_id");
  CREATE INDEX "coupons_categories_order_idx" ON "coupons_categories" USING btree ("_order");
  CREATE INDEX "coupons_categories_parent_id_idx" ON "coupons_categories" USING btree ("_parent_id");
  CREATE INDEX "coupons_categories_category_idx" ON "coupons_categories" USING btree ("category_id");
  CREATE UNIQUE INDEX "coupons_code_idx" ON "coupons" USING btree ("code");
  CREATE INDEX "coupons_updated_at_idx" ON "coupons" USING btree ("updated_at");
  CREATE INDEX "coupons_created_at_idx" ON "coupons" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "orders_items" USING btree ("product_id");
  CREATE INDEX "orders_refunds_order_idx" ON "orders_refunds" USING btree ("_order");
  CREATE INDEX "orders_refunds_parent_id_idx" ON "orders_refunds" USING btree ("_parent_id");
  CREATE INDEX "orders_applied_fees_order_idx" ON "orders_applied_fees" USING btree ("_order");
  CREATE INDEX "orders_applied_fees_parent_id_idx" ON "orders_applied_fees" USING btree ("_parent_id");
  CREATE INDEX "orders_applied_fees_fee_id_idx" ON "orders_applied_fees" USING btree ("fee_id_id");
  CREATE INDEX "orders_notes_order_idx" ON "orders_notes" USING btree ("_order");
  CREATE INDEX "orders_notes_parent_id_idx" ON "orders_notes" USING btree ("_parent_id");
  CREATE INDEX "orders_owner_idx" ON "orders" USING btree ("owner_id");
  CREATE INDEX "reviews_product_idx" ON "reviews" USING btree ("product_id");
  CREATE INDEX "reviews_user_idx" ON "reviews" USING btree ("user_id");
  CREATE INDEX "reviews_order_idx" ON "reviews" USING btree ("order_id");
  CREATE INDEX "shippingzones_methods_order_idx" ON "shippingzones_methods" USING btree ("_order");
  CREATE INDEX "shippingzones_methods_parent_id_idx" ON "shippingzones_methods" USING btree ("_parent_id");
  CREATE INDEX "shippingzones_updated_at_idx" ON "shippingzones" USING btree ("updated_at");
  CREATE INDEX "shippingzones_created_at_idx" ON "shippingzones" USING btree ("created_at");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "contact_messages_updated_at_idx" ON "contact_messages" USING btree ("updated_at");
  CREATE INDEX "email_logs_updated_at_idx" ON "email_logs" USING btree ("updated_at");
  CREATE INDEX "email_logs_created_at_idx" ON "email_logs" USING btree ("created_at");
  CREATE INDEX "affiliate_applications_social_links_order_idx" ON "affiliate_applications_social_links" USING btree ("_order");
  CREATE INDEX "affiliate_applications_social_links_parent_id_idx" ON "affiliate_applications_social_links" USING btree ("_parent_id");
  CREATE INDEX "affiliate_applications_user_idx" ON "affiliate_applications" USING btree ("user_id");
  CREATE INDEX "affiliate_applications_reviewed_by_idx" ON "affiliate_applications" USING btree ("reviewed_by_id");
  CREATE INDEX "affiliate_applications_linked_affiliate_idx" ON "affiliate_applications" USING btree ("linked_affiliate_id");
  CREATE INDEX "affiliate_applications_updated_at_idx" ON "affiliate_applications" USING btree ("updated_at");
  CREATE INDEX "affiliate_applications_created_at_idx" ON "affiliate_applications" USING btree ("created_at");
  CREATE INDEX "affiliates_social_links_order_idx" ON "affiliates_social_links" USING btree ("_order");
  CREATE INDEX "affiliates_social_links_parent_id_idx" ON "affiliates_social_links" USING btree ("_parent_id");
  CREATE INDEX "affiliates_payout_methods_order_idx" ON "affiliates_payout_methods" USING btree ("_order");
  CREATE INDEX "affiliates_payout_methods_parent_id_idx" ON "affiliates_payout_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "affiliates_user_idx" ON "affiliates" USING btree ("user_id");
  CREATE INDEX "affiliates_approved_by_idx" ON "affiliates" USING btree ("approved_by_id");
  CREATE INDEX "affiliates_parent_affiliate_idx" ON "affiliates" USING btree ("parent_affiliate_id");
  CREATE UNIQUE INDEX "affiliates_referral_slug_idx" ON "affiliates" USING btree ("referral_slug");
  CREATE UNIQUE INDEX "affiliates_coupon_code_idx" ON "affiliates" USING btree ("coupon_code");
  CREATE INDEX "affiliates_coupon_idx" ON "affiliates" USING btree ("coupon_id");
  CREATE INDEX "affiliates_updated_at_idx" ON "affiliates" USING btree ("updated_at");
  CREATE INDEX "affiliates_created_at_idx" ON "affiliates" USING btree ("created_at");
  CREATE INDEX "affiliate_clicks_affiliate_idx" ON "affiliate_clicks" USING btree ("affiliate_id");
  CREATE INDEX "affiliate_clicks_ip_hash_idx" ON "affiliate_clicks" USING btree ("ip_hash");
  CREATE INDEX "affiliate_clicks_session_id_idx" ON "affiliate_clicks" USING btree ("session_id");
  CREATE INDEX "affiliate_clicks_conversion_idx" ON "affiliate_clicks" USING btree ("conversion_id");
  CREATE INDEX "affiliate_clicks_clicked_at_idx" ON "affiliate_clicks" USING btree ("clicked_at");
  CREATE INDEX "affiliate_clicks_updated_at_idx" ON "affiliate_clicks" USING btree ("updated_at");
  CREATE INDEX "affiliate_clicks_created_at_idx" ON "affiliate_clicks" USING btree ("created_at");
  CREATE INDEX "affiliate_conversions_affiliate_idx" ON "affiliate_conversions" USING btree ("affiliate_id");
  CREATE UNIQUE INDEX "affiliate_conversions_order_idx" ON "affiliate_conversions" USING btree ("order_id");
  CREATE INDEX "affiliate_conversions_customer_idx" ON "affiliate_conversions" USING btree ("customer_id");
  CREATE INDEX "affiliate_conversions_attribution_click_idx" ON "affiliate_conversions" USING btree ("attribution_click_id");
  CREATE INDEX "affiliate_conversions_status_idx" ON "affiliate_conversions" USING btree ("status");
  CREATE INDEX "affiliate_conversions_pending_until_idx" ON "affiliate_conversions" USING btree ("pending_until");
  CREATE INDEX "affiliate_conversions_payout_idx" ON "affiliate_conversions" USING btree ("payout_id");
  CREATE INDEX "affiliate_conversions_reversed_by_idx" ON "affiliate_conversions" USING btree ("reversed_by_id");
  CREATE INDEX "affiliate_conversions_updated_at_idx" ON "affiliate_conversions" USING btree ("updated_at");
  CREATE INDEX "affiliate_conversions_created_at_idx" ON "affiliate_conversions" USING btree ("created_at");
  CREATE INDEX "affiliate_payouts_affiliate_idx" ON "affiliate_payouts" USING btree ("affiliate_id");
  CREATE INDEX "affiliate_payouts_created_by_idx" ON "affiliate_payouts" USING btree ("created_by_id");
  CREATE INDEX "affiliate_payouts_processed_by_idx" ON "affiliate_payouts" USING btree ("processed_by_id");
  CREATE INDEX "affiliate_payouts_receipt_file_idx" ON "affiliate_payouts" USING btree ("receipt_file_id");
  CREATE INDEX "affiliate_payouts_updated_at_idx" ON "affiliate_payouts" USING btree ("updated_at");
  CREATE INDEX "affiliate_payouts_created_at_idx" ON "affiliate_payouts" USING btree ("created_at");
  CREATE INDEX "affiliate_payouts_rels_order_idx" ON "affiliate_payouts_rels" USING btree ("order");
  CREATE INDEX "affiliate_payouts_rels_parent_idx" ON "affiliate_payouts_rels" USING btree ("parent_id");
  CREATE INDEX "affiliate_payouts_rels_path_idx" ON "affiliate_payouts_rels" USING btree ("path");
  CREATE INDEX "affiliate_payouts_rels_affiliate_conversions_id_idx" ON "affiliate_payouts_rels" USING btree ("affiliate_conversions_id");
  CREATE INDEX "payout_requests_affiliate_idx" ON "payout_requests" USING btree ("affiliate_id");
  CREATE INDEX "payout_requests_processed_by_idx" ON "payout_requests" USING btree ("processed_by_id");
  CREATE INDEX "payout_requests_updated_at_idx" ON "payout_requests" USING btree ("updated_at");
  CREATE INDEX "payout_requests_created_at_idx" ON "payout_requests" USING btree ("created_at");
  CREATE INDEX "processing_fees_updated_at_idx" ON "processing_fees" USING btree ("updated_at");
  CREATE INDEX "processing_fees_created_at_idx" ON "processing_fees" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_trash_id_idx" ON "payload_locked_documents_rels" USING btree ("trash_id");
  CREATE INDEX "payload_locked_documents_rels_order_counters_id_idx" ON "payload_locked_documents_rels" USING btree ("order_counters_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_addresses_id_idx" ON "payload_locked_documents_rels" USING btree ("addresses_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("carts_id");
  CREATE INDEX "payload_locked_documents_rels_wishlists_id_idx" ON "payload_locked_documents_rels" USING btree ("wishlists_id");
  CREATE INDEX "payload_locked_documents_rels_coupons_id_idx" ON "payload_locked_documents_rels" USING btree ("coupons_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_shippingzones_id_idx" ON "payload_locked_documents_rels" USING btree ("shippingzones_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_contact_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_messages_id");
  CREATE INDEX "payload_locked_documents_rels_email_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("email_logs_id");
  CREATE INDEX "payload_locked_documents_rels_affiliate_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliate_applications_id");
  CREATE INDEX "payload_locked_documents_rels_affiliates_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliates_id");
  CREATE INDEX "payload_locked_documents_rels_affiliate_clicks_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliate_clicks_id");
  CREATE INDEX "payload_locked_documents_rels_affiliate_conversions_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliate_conversions_id");
  CREATE INDEX "payload_locked_documents_rels_affiliate_payouts_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliate_payouts_id");
  CREATE INDEX "payload_locked_documents_rels_payout_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("payout_requests_id");
  CREATE INDEX "payload_locked_documents_rels_processing_fees_id_idx" ON "payload_locked_documents_rels" USING btree ("processing_fees_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "trash" CASCADE;
  DROP TABLE "order_counters" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "addresses" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_variants_options" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products_bulk_bundles_variant_overrides" CASCADE;
  DROP TABLE "products_bulk_bundles" CASCADE;
  DROP TABLE "products_faqs" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "carts_items" CASCADE;
  DROP TABLE "carts" CASCADE;
  DROP TABLE "wishlists_items" CASCADE;
  DROP TABLE "wishlists" CASCADE;
  DROP TABLE "coupons_locked_emails" CASCADE;
  DROP TABLE "coupons_products" CASCADE;
  DROP TABLE "coupons_categories" CASCADE;
  DROP TABLE "coupons" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders_refunds" CASCADE;
  DROP TABLE "orders_applied_fees" CASCADE;
  DROP TABLE "orders_notes" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "shippingzones_methods" CASCADE;
  DROP TABLE "shippingzones" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "contact_messages" CASCADE;
  DROP TABLE "email_logs" CASCADE;
  DROP TABLE "affiliate_applications_social_links" CASCADE;
  DROP TABLE "affiliate_applications" CASCADE;
  DROP TABLE "affiliates_social_links" CASCADE;
  DROP TABLE "affiliates_payout_methods" CASCADE;
  DROP TABLE "affiliates" CASCADE;
  DROP TABLE "affiliate_clicks" CASCADE;
  DROP TABLE "affiliate_conversions" CASCADE;
  DROP TABLE "affiliate_payouts" CASCADE;
  DROP TABLE "affiliate_payouts_rels" CASCADE;
  DROP TABLE "payout_requests" CASCADE;
  DROP TABLE "processing_fees" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "affiliate_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_preferred_locale";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_coupons_type";
  DROP TYPE "public"."enum_coupons_applicable_product_types";
  DROP TYPE "public"."enum_coupons_applies_to";
  DROP TYPE "public"."enum_orders_notes_type";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_payment_status";
  DROP TYPE "public"."enum_orders_fulfillment_status";
  DROP TYPE "public"."enum_reviews_status";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_email_logs_status";
  DROP TYPE "public"."enum_affiliate_applications_social_links_platform";
  DROP TYPE "public"."enum_affiliate_applications_status";
  DROP TYPE "public"."enum_affiliate_applications_estimated_monthly_reach";
  DROP TYPE "public"."enum_affiliates_social_links_platform";
  DROP TYPE "public"."enum_affiliates_payout_methods_type";
  DROP TYPE "public"."enum_affiliates_status";
  DROP TYPE "public"."enum_affiliates_commission_type";
  DROP TYPE "public"."enum_affiliates_commission_on";
  DROP TYPE "public"."enum_affiliates_tier";
  DROP TYPE "public"."enum_affiliates_payout_currency";
  DROP TYPE "public"."enum_affiliate_clicks_source";
  DROP TYPE "public"."enum_affiliate_clicks_device_type";
  DROP TYPE "public"."enum_affiliate_conversions_attribution_source";
  DROP TYPE "public"."enum_affiliate_conversions_status";
  DROP TYPE "public"."enum_affiliate_conversions_reversed_reason";
  DROP TYPE "public"."enum_affiliate_payouts_currency";
  DROP TYPE "public"."enum_affiliate_payouts_payment_method";
  DROP TYPE "public"."enum_affiliate_payouts_status";
  DROP TYPE "public"."enum_payout_requests_payout_method";
  DROP TYPE "public"."enum_payout_requests_status";
  DROP TYPE "public"."enum_processing_fees_type";
  DROP TYPE "public"."enum_affiliate_settings_default_commission_type";
  DROP TYPE "public"."enum_affiliate_settings_default_commission_on";`)
}
