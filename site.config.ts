/**
 * Central site configuration — SEO metadata, header/footer, legal pages and mailto links read from here.
 */
export const site = {
  name: "Galla Peti",
  tagline: "Billing app for every Indian shop",
  slogan: "Traditional Trust + Modern Speed",
  description:
    "Galla Peti is a fast, offline billing app for Indian shops — GST bills, thermal printing, UPI QR, WhatsApp bills, items from Excel, and sales & profit reports. Free forever.",
  company: "Innovait Systems",

  url: "https://gallapeti.innovait-systems.com",
  supportEmail: "gallapeti@innovait-systems.com",
  // Step-by-step guides (separate Docusaurus site: gallapeti/docs).
  helpUrl: "https://help.gallapeti.innovait-systems.com",

  // Android app (Google Play). The package is permanent once published.
  androidPackage: "com.innovait.gallapeti",
  // Empty until the Play listing is public — the site then shows "request access" instead.
  playStoreUrl: "",

  locationLegal: "Chennai, Tamil Nadu, India",
  lastUpdated: "29 September 2026",
} as const;

export const nav = [
  { label: "Features", href: "/#features" },
  { label: "For your shop", href: "/#shops" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Help", href: site.helpUrl },
  { label: "Support", href: "/support" },
] as const;
