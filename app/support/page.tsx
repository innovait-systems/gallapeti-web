import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${site.name} — printers, GST bills, backups and more.`,
};

const tips = [
  { q: "Printer not printing", a: "Settings → Printer & paper → pick your printer → Test print. Printing half a bill? Turn on “Slow printer mode”. Text cut off? Choose Custom paper and adjust characters per line." },
  { q: "Moving to a new phone", a: "On the old phone: Settings → Backup & restore → Create backup, and save it to Drive or your WhatsApp. On the new phone: tap “Restore from backup” on the welcome screen." },
  { q: "Adding many items", a: "Items → Import / Export Excel → Download template. Fill it in Excel or Google Sheets and import it back." },
  { q: "Two phones in one shop", a: "Give each phone a different bill number prefix (Settings → Shop details) so invoice numbers never repeat." },
];

const links = [
  { label: "Frequently asked questions", href: "/#faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Delete your data", href: "/delete-data" },
];

export default function SupportPage() {
  return (
    <div className="bg-glow">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Support</h1>
        <p className="mt-4 text-lg text-ink-soft">We&rsquo;re here to help you bill faster with {site.name}.</p>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-7">
          <h2 className="text-lg font-semibold text-ink">Email us</h2>
          <p className="mt-2 text-[15px] text-ink-soft">
            Write to{" "}
            <a href={`mailto:${site.supportEmail}`} className="font-medium text-brand-600 underline">
              {site.supportEmail}
            </a>
            . We usually reply within 1&ndash;2 business days. The quickest way is <strong className="text-ink">Settings → Help → Send feedback</strong> in the app — it adds your app and phone version for us.
          </p>
          <p className="mt-3 text-[15px] text-ink-soft">Please include:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] text-ink-soft">
            <li>What you were doing and what went wrong</li>
            <li>A screenshot, if you can</li>
            <li>Your printer model, for printing questions</li>
          </ul>
          <div className="mt-6">
            <Button href={`mailto:${site.supportEmail}`}>Email support</Button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-7">
          <h2 className="text-lg font-semibold text-ink">Quick fixes</h2>
          <dl className="mt-3 space-y-4">
            {tips.map((t) => (
              <div key={t.q}>
                <dt className="font-semibold text-ink">{t.q}</dt>
                <dd className="mt-1 text-[15px] text-ink-soft">{t.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-7">
          <h2 className="text-lg font-semibold text-ink">Helpful links</h2>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[15px] text-brand-600 underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
