# Visitor monitoring and application contact fields

Apply migrations `0015_application_contact_fields.sql` and `0016_visitor_monitoring.sql`, after 0014, in the hosted Supabase SQL editor. Migration 0015 preserves earlier applications and requires email, phone, and address for new guest and candidate applications. Resume and professional social links remain optional HTTPS links. Admin application pages show the stored contact details.

## Enable visitor capture

Set `VISITOR_TRACKING_ENABLED=true` and `SUPABASE_SERVICE_ROLE_KEY` in the application's server/deployment environment, then restart or redeploy. Keep the service key server-only; never use a `NEXT_PUBLIC_` variable or commit it. This key is necessary because anonymous clients cannot insert or read visitor records. With capture disabled or the key missing, the website continues working and the admin dashboard displays setup instructions.

The marketing pages send only their pathname to `/api/visits`, with no query strings, GPS access, account ID, or persistent visitor cookie. The server obtains the IP and approximate country/region/city from Vercel-managed request headers when deployed on Vercel. Browser-supplied IP and location fields are ignored. Other hosts intentionally record Unknown for IP/location; do not trust arbitrary forwarding headers to identify users. No third-party IP lookup service receives visitors' IP addresses.

Records are visible only to admins under **Website Visitors**. The dashboard refreshes every 30 seconds while visible, supports manual refresh, search, and time periods, and shows the latest 500 records. Counts represent recorded visits, not unique people or guaranteed online sessions. IPs can reflect shared networks, VPNs or proxies. Same-IP/page visits within one minute are deduplicated, and old records are cleaned up after 90 days when a new visit arrives.

Do Not Track, Global Privacy Control, and the browser preference on `/privacy` disable future capture. The footer links to the visitor information and preference page. These choices do not affect recruitment applications.

Use Vercel preview/production requests to verify real IP/geolocation fields. Local development intentionally does not fabricate an IP or location. A configured capture endpoint always returns an empty response, including when logging fails, so analytics cannot interrupt normal navigation.
