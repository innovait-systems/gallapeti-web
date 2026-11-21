/**
 * POST /api/pro/check — Galla Peti asks: "is this copy genuine and is its Pro subscription real?"
 * Replies with a verdict signed by our key (see lib/pro-check.ts). Until the env vars below are set,
 * it answers {status:"off"} and the app simply trusts Google Play, as before.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   GOOGLE_SERVICE_ACCOUNT_JSON  service-account key JSON (or base64 of it) with Play Console access
 *   PRO_CHECK_SIGNING_KEY        EC P-256 private key PEM (credentials/pro-check-signing.pem)
 *   GOOGLE_CLOUD_PROJECT_NUMBER  number of the Cloud project linked in Play Console → App integrity
 *
 * GET  → signed settings: which Cloud project the app should ask Play Integrity with (0 = off).
 * POST → signed verdict for one purchase on one phone.
 */
import {
  PACKAGE,
  checkIntegrity,
  checkSubscription,
  makeConfig,
  makeVerdict,
  parseProjectNumber,
  parseRequest,
  parseServiceAccount,
  pemFromEnv,
  serviceAccountJwt,
  signVerdict,
  type ServiceAccount,
} from "@/lib/pro-check";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SCOPES = ["https://www.googleapis.com/auth/playintegrity", "https://www.googleapis.com/auth/androidpublisher"];

let cachedToken: { token: string; exp: number } | null = null;

async function accessToken(sa: ServiceAccount): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.exp - 60_000 > now) return cachedToken.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: serviceAccountJwt(sa, SCOPES, Math.floor(now / 1000)),
    }),
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  const j = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: j.access_token, exp: now + j.expires_in * 1000 };
  return j.access_token;
}

class GoogleError extends Error {
  constructor(public status: number, where: string) {
    super(`${where} ${status}`);
  }
}

async function google(url: string, token: string, body?: unknown): Promise<unknown> {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new GoogleError(res.status, new URL(url).pathname.split("/").slice(0, 4).join("/"));
  return res.json();
}

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "cache-control": "no-store" } });

function env() {
  const sa = parseServiceAccount(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const key = pemFromEnv(process.env.PRO_CHECK_SIGNING_KEY);
  const cloud = parseProjectNumber(process.env.GOOGLE_CLOUD_PROJECT_NUMBER);
  return sa && key && cloud ? { sa, key, cloud } : null;
}

export async function GET() {
  const e = env();
  if (!e) return json({ status: "off" });
  return json({ status: "ok", ...signVerdict(makeConfig(e.cloud), e.key) });
}

export async function POST(req: Request) {
  const e = env();
  if (!e) return json({ status: "off" });
  const { sa, key } = e;

  const r = parseRequest(await req.json().catch(() => null));
  if (!r) return json({ status: "bad-request" }, 400);

  try {
    const token = await accessToken(sa);
    const now = Date.now();

    const decoded = await google(`https://playintegrity.googleapis.com/v1/${PACKAGE}:decodeIntegrityToken`, token, {
      integrity_token: r.integrityToken,
    });
    const integrity = checkIntegrity(decoded, r, Date.now());
    if (!integrity.ok) {
      if (integrity.reason !== "not-genuine") return json({ status: integrity.reason });
      return json({ status: "ok", ...signVerdict(makeVerdict(r, now, { pro: false, reason: "not-genuine" }), key) });
    }

    let sub: unknown = null;
    try {
      sub = await google(
        `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE}/purchases/subscriptionsv2/tokens/${encodeURIComponent(r.purchaseToken)}`,
        token,
      );
    } catch (e) {
      // 404/410: Google has no such purchase (made up, or long expired). Anything else: try later.
      if (!(e instanceof GoogleError && (e.status === 404 || e.status === 410))) throw e;
    }
    return json({ status: "ok", ...signVerdict(makeVerdict(r, now, checkSubscription(sub, now)), key) });
  } catch (e) {
    console.error("pro-check", e instanceof Error ? e.message : e);
    return json({ status: "retry" });
  }
}
