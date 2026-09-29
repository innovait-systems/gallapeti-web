import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20",
  // Gold always carries dark text — white on gold is unreadable.
  gold: "bg-gold text-ink hover:brightness-95 shadow-sm shadow-gold/30",
  outline: "border border-ink/15 bg-white text-ink hover:border-ink/30",
  ghost: "text-ink hover:bg-ink/[0.05]",
};

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
