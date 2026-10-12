"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { getAppHref, nav, site } from "@/site.config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={getAppHref} variant="gold">
            Get the app
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/5 bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href={getAppHref} variant="gold" className="mt-2" onClick={() => setOpen(false)}>
              Get the app
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
