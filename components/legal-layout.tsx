import type { ReactNode } from "react";

export function LegalLayout({ title, updated, intro, children }: { title: string; updated?: string; intro?: string; children: ReactNode }) {
  return (
    <div className="bg-glow">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-ink-soft">Last updated: {updated}</p>}
        {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
        <div className="mt-8 text-[15px] leading-relaxed text-ink-soft [&_a]:text-brand-600 [&_a]:underline [&_h2]:mt-9 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </div>
  );
}
