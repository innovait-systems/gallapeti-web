# Galla Peti — website

Marketing site and legal pages for **Galla Peti** by Innovait Systems: home, privacy policy, terms,
support and delete-your-data. Served at `https://gallapeti.innovait-systems.com` — the privacy URL is
used in the Google Play listing.

Next.js 16 (App Router) + Tailwind CSS 4; every page is static. URLs, support email and the Play link
live in `site.config.ts` — set `playStoreUrl` once the Play listing is public.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

Help guides live in the sibling project `../gallapeti-docs`.
