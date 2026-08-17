-- Seed only content already represented in the Stage 12 UI. No invented numeric pricing.
insert into public.products (slug,name,category,description,product_type,status,price_label)
values
('website-launch-package','Website Launch Package','Web Design','A structured website design and launch engagement.','service','active','Quote-based'),
('brand-identity-system','Brand Identity System','Branding','A disciplined visual identity foundation for a commercial brand.','service','active','Quote-based'),
('business-document-kit','Business Document Kit','Digital Products','Reusable business-document resources.','digital','active','Price managed in admin'),
('custom-printed-apparel','Custom Printed Apparel','Merchandise','Custom branded clothing and printed apparel.','physical','active','Quote-based')
on conflict (slug) do update set
  name=excluded.name,
  category=excluded.category,
  description=excluded.description,
  product_type=excluded.product_type,
  status=excluded.status,
  price_label=excluded.price_label;

insert into public.membership_plans (slug,name,description,status,billing_interval,entitlements)
values
('free','Free','Account foundation for purchases and basic access.','active','one_time','{"account":true}'::jsonb),
('member','Member','Premium content and product-access foundation.','active','month','{"premium_content":true,"downloads":true}'::jsonb),
('client','Client','Project collaboration and client-portal access.','active','month','{"client_portal":true,"project_files":true,"invoices":true,"support":true}'::jsonb)
on conflict (slug) do update set name=excluded.name,description=excluded.description,status=excluded.status,entitlements=excluded.entitlements;
