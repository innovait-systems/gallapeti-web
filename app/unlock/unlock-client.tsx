"use client";

import { useEffect, useState } from "react";

const TOKEN = /^[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{40,}$/;

export function UnlockClient() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = decodeURIComponent(window.location.hash.replace(/^#/, "")).trim();
    setToken(TOKEN.test(t) ? t : null);
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!token) {
    return (
      <p className="mt-4 text-lg text-ink-soft">
        This link is incomplete. Copy the whole link from the message Galla Peti support sent you and open it again.
      </p>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <p className="mt-4 text-lg text-ink-soft">
        Open this page on the shop&rsquo;s phone — the one that showed the request code — and tap the button.
      </p>
      <a
        href={`galla://support-unlock?t=${encodeURIComponent(token)}`}
        className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-4 text-lg font-semibold text-white"
      >
        Open Galla Peti
      </a>
      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 text-[15px] text-ink-soft">
        <p className="font-semibold text-ink">App didn&rsquo;t open?</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Copy the unlock code.</li>
          <li>Open Galla Peti → Forgot owner PIN → Lost the recovery code too?</li>
          <li>Paste it under &ldquo;Got the unlock link?&rdquo; and tap Unlock.</li>
        </ol>
        <button type="button" onClick={copy} className="mt-4 rounded-lg border border-ink/20 px-4 py-2 font-medium text-ink">
          {copied ? "Copied" : "Copy unlock code"}
        </button>
      </div>
      <p className="mt-6 text-sm text-ink-soft">The code works once, only on that phone, and expires in a few days.</p>
    </>
  );
}
