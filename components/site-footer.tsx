import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/site.config";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Screens", href: "/#screens" },
      { label: "For your shop", href: "/#shops" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Help guides", href: site.helpUrl },
      { label: "Support", href: "/support" },
      { label: "Contact", href: `mailto:${site.supportEmail}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Delete your data", href: "/delete-data" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm text-ink-soft">{site.slogan}.</p>
          <p className="mt-1 text-sm text-ink-soft">
            A product of <span className="font-semibold text-ink">{site.company}</span>.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{group.title}</h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-ink-soft sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p>Made in India for kirana, crackers, clothing and jewellery shops.</p>
        </div>
      </div>
    </footer>
  );
}
