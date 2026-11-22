import type { Metadata } from "next";
import { UnlockClient } from "./unlock-client";

export const metadata: Metadata = {
  title: "Unlock Galla Peti",
  description: "Open the unlock link from Galla Peti support in the app.",
  robots: { index: false, follow: false },
};

/**
 * Landing page for support-unlock links (https://…/unlock#<code>). The code stays in the URL
 * fragment, so it never reaches our server or its logs; this page only hands it to the app.
 */
export default function UnlockPage() {
  return (
    <div className="bg-glow">
      <div className="mx-auto max-w-xl px-5 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Unlock Galla Peti</h1>
        <UnlockClient />
      </div>
    </div>
  );
}
