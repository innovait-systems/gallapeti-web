import Image from "next/image";
import { Button } from "@/components/button";
import { site } from "@/site.config";

const features = [
  { icon: "⚡", title: "Bill in seconds", body: "Tap items on a big grid, scan barcodes, type quantities for loose items, hold a bill and serve the next customer." },
  { icon: "🖨️", title: "Thermal printing", body: "2\", 3\", 4\" or any custom roll. Bluetooth and Wi-Fi printers, or any printer through Android. Your shop logo on every bill." },
  { icon: "🧾", title: "GST-ready bills", body: "CGST/SGST or IGST worked out for you, prices with or without GST, HSN codes and GSTIN check." },
  { icon: "🏷️", title: "MRP & discounts", body: "Sell at MRP, your own price, or a % off — like 80% off MRP for crackers. Bills show what the customer saved." },
  { icon: "📲", title: "UPI QR with amount", body: "Customers scan and pay the exact amount. Add backup UPI IDs and swipe to the next one if a payment fails." },
  { icon: "💬", title: "WhatsApp & SMS bills", body: "Send the bill to the customer's WhatsApp or SMS from your own phone, or share a PDF." },
  { icon: "📊", title: "Sales & profit", body: "Today, this week and this month — sales, bills, profit, payments, top items, with a simple chart." },
  { icon: "📥", title: "Items from Excel", body: "Download the template, fill your price list in Excel or Google Sheets, and import hundreds of items at once." },
  { icon: "📴", title: "Works offline", body: "No internet needed to bill. Everything is saved on your phone, with one-tap backup to Drive or WhatsApp." },
];

const screens = [
  { src: "/screenshots/01-home.webp", alt: "Home: today's sales, profit and bills at a glance" },
  { src: "/screenshots/02-new-sale.webp", alt: "New bill: tap items from a grid with MRP savings" },
  { src: "/screenshots/03-upi.webp", alt: "UPI QR with the amount filled in, swipe for another UPI ID" },
  { src: "/screenshots/04-share.webp", alt: "Send the bill on WhatsApp or SMS, print it or share a PDF" },
  { src: "/screenshots/05-receipt.webp", alt: "GST bill ready for a 2-inch thermal printer" },
  { src: "/screenshots/06-reports.webp", alt: "Sales and profit report for the week" },
  { src: "/screenshots/07-item.webp", alt: "Item with MRP, discount and cost price, showing the margin" },
  { src: "/screenshots/08-excel.webp", alt: "Excel import preview with new, updated and rows to fix" },
];

const shops = [
  { icon: "🧺", name: "Kirana & grocery", body: "Loose items by kg, barcodes, MRP and stock." },
  { icon: "🎆", name: "Crackers", body: "Big % off MRP, gift boxes, fast billing in the Diwali rush." },
  { icon: "👕", name: "Clothing & fashion", body: "Sizes and colours, MRP with discounts, exchanges." },
  { icon: "💍", name: "Fashion jewellery", body: "Sets and pairs, 3% GST, MRP and offers." },
  { icon: "🏪", name: "Any other shop", body: "Simple item + price billing that just works." },
];

const faqs = [
  { q: "Do I need internet to use Galla Peti?", a: "No. Billing, printing, reports and backups work fully offline. Internet is only used when you choose to share a bill on WhatsApp or email, or print to a Wi-Fi printer on your network." },
  { q: "Which printers work?", a: "Most 2-inch (58mm) and 3-inch (80mm) ESC/POS thermal printers over Bluetooth or Wi-Fi, 4-inch and custom widths, and any printer your phone can reach through Android's print screen (A4, inkjet or Save as PDF)." },
  { q: "Where is my data stored?", a: "On your phone. We don't run servers that receive your bills or items. Use Settings → Backup & restore to save a copy to Google Drive, email or your own WhatsApp." },
  { q: "Can I use it on more than one phone?", a: "Yes — each phone keeps its own items and bills. Give each phone a different bill number prefix (A1, A2…) so invoice numbers never clash. Copy your item list between phones with Excel export/import. Sync across phones is planned for Pro." },
  { q: "Is it really free?", a: "Yes. Unlimited bills, GST, printing, WhatsApp bills, Excel import and reports are free forever. Free bills end with a small “Billed with Galla Peti” line. Pro, coming soon, adds cloud backup, multiple phones, staff logins and removes the line." },
  { q: "Does it support GST invoices?", a: "Yes — tax invoices with CGST/SGST or IGST, HSN codes, GSTIN on the bill and a GST summary. You remain responsible for the tax rates you set on your items." },
];

export default function Home() {
  const onPlay = Boolean(site.playStoreUrl);
  return (
    <>
      {/* Hero */}
      <section className="bg-glow">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-ink">
              Free billing app · Made in India
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Simple. Fast. <span className="text-brand-600">Built for every shop.</span>
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              {site.name} turns your phone into a billing counter — GST bills, thermal printing, UPI QR and WhatsApp bills, even
              without internet.
            </p>
            <p className="mt-3 text-base font-semibold text-brand-600">Peti ka Vishwas, Digital ki Raftaar!</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#get-app" variant="gold">
                Get the app — it&rsquo;s free
              </Button>
              <Button href="/#features" variant="outline">
                See features
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src="/logo-full.png" alt={`${site.name} — ${site.slogan}`} width={1570} height={421} className="h-auto w-full max-w-lg" priority />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-ink">Everything a shop counter needs</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">Designed with shopkeepers for the busiest hours — big buttons, few taps, no training needed.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <div className="text-2xl" aria-hidden>{f.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screens */}
      <section id="screens" className="scroll-mt-20 border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-ink">See it in action</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">A real day at a kirana counter — from the first bill to the profit report.</p>
          <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4">
            {screens.map((sc) => (
              <Image
                key={sc.src}
                src={sc.src}
                alt={sc.alt}
                width={540}
                height={960}
                className="h-auto w-60 shrink-0 snap-start rounded-2xl border border-ink/10 shadow-sm sm:w-64"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shops */}
      <section id="shops" className="scroll-mt-20 bg-brand-600">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">Set up for your kind of shop</h2>
          <p className="mt-3 max-w-2xl text-white/90">Pick what you sell and Galla Peti sets units, GST and billing style to match — with sample items to try a bill in seconds.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {shops.map((s) => (
              <div key={s.name} className="rounded-2xl bg-white p-5">
                <div className="text-2xl" aria-hidden>{s.icon}</div>
                <h3 className="mt-2 font-semibold text-ink">{s.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-ink">Free forever. Pro when you grow.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-brand-600 bg-white p-7">
            <h3 className="text-xl font-bold text-ink">Free</h3>
            <p className="mt-1 text-3xl font-bold text-brand-600">₹0</p>
            <ul className="mt-5 space-y-2 text-[15px] text-ink-soft">
              {["Unlimited bills", "GST invoices", "Thermal & any-printer printing", "Shop logo on bills", "UPI QR, WhatsApp & SMS bills", "Excel import/export", "Sales & profit reports", "Backup & restore"].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-brand-600">✓</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-soft">Bills end with a small &ldquo;Billed with {site.name}&rdquo; line.</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-gold-soft p-7">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-ink">Pro</h3>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">Coming soon</span>
            </div>
            <p className="mt-1 text-[15px] text-ink-soft">Everything in Free, plus:</p>
            <ul className="mt-5 space-y-2 text-[15px] text-ink-soft">
              {["Automatic cloud backup", "Use on multiple phones with shared sales", "Staff logins and shifts", "GST summaries & Excel reports", "No branding on bills"].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-ink">★</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-2xl border border-ink/10 bg-white p-8 md:flex md:items-center md:gap-8">
          <div className="text-4xl" aria-hidden>🔒</div>
          <div>
            <h2 className="text-2xl font-bold text-ink">Your shop data stays on your phone</h2>
            <p className="mt-2 text-ink-soft">
              No sign-up and no account. Bills, items and customer numbers are stored on your device — we don&rsquo;t collect them.
              Read our <a href="/privacy" className="font-medium text-brand-600 underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-ink">Questions</h2>
          <div className="mt-8 divide-y divide-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-brand-600 transition group-open:rotate-45" aria-hidden>+</span>
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Get the app */}
      <section id="get-app" className="scroll-mt-20 bg-glow">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <Image src="/logo.png" alt="" width={96} height={96} className="mx-auto h-24 w-24" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink">Get {site.name} on Android</h2>
          {onPlay ? (
            <>
              <p className="mt-3 text-ink-soft">Free on Google Play.</p>
              <div className="mt-8">
                <Button href={site.playStoreUrl} variant="gold">Get it on Google Play</Button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-ink-soft">
                {site.name} is launching on Google Play soon. Email us to join early testing and we&rsquo;ll send you the link.
              </p>
              <div className="mt-8">
                <Button href={`mailto:${site.supportEmail}?subject=${encodeURIComponent(`${site.name} early access`)}`} variant="gold">
                  Request early access
                </Button>
              </div>
            </>
          )}
          <p className="mt-6 text-sm text-ink-soft">
            A product of <span className="font-semibold text-ink">{site.company}</span>
          </p>
        </div>
      </section>
    </>
  );
}
