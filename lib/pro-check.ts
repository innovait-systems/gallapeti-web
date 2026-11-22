/**
 * Galla Peti Pro check — pure logic for app/api/pro/check (no network here, so it can be tested).
 *
 * The app sends: a Play Integrity token (is this the real Galla Peti from Google Play?) and its Pro
 * purchase token (is the subscription real and active?). We ask Google about both and send back a
 * signed verdict. The app checks the signature with the public key built into it, so a faked reply
 * can't turn Pro on. No shop data is ever sent: no bills, items or customers.
 */
import { createHash, createSign, sign as signData } from "node:crypto";

export const PACKAGE = "com.innovait.gallapeti";
/** Play subscription products -> plan. galla_pro was the only product before Growth existed. */
export const PRODUCTS = { galla_growth: "growth", galla_pro: "pro" } as const;
export type Tier = (typeof PRODUCTS)[keyof typeof PRODUCTS];
const tierOf = (productId: string | undefined): Tier | null =>
  productId && Object.prototype.hasOwnProperty.call(PRODUCTS, productId) ? PRODUCTS[productId as keyof typeof PRODUCTS] : null;
/** An integrity token older than this is refused (the app asks for a fresh one every check). */
export const MAX_TOKEN_AGE_MS = 10 * 60 * 1000;

export interface CheckRequest {
  /** Random id the app made at install — binds the verdict to this phone. */
  installId: string;
  purchaseToken: string;
  /** One-time value for this check. */
  nonce: string;
  integrityToken: string;
}

const ID = /^[A-Za-z0-9_-]{8,64}$/;
const str = (v: unknown, max: number) => typeof v === "string" && v.length > 0 && v.length <= max;

export function parseRequest(body: unknown): CheckRequest | null {
  const b = (body ?? {}) as Record<string, unknown>;
  if (typeof b.installId !== "string" || !ID.test(b.installId)) return null;
  if (typeof b.nonce !== "string" || !ID.test(b.nonce)) return null;
  if (!str(b.purchaseToken, 2000) || !str(b.integrityToken, 20000)) return null;
  return { installId: b.installId, purchaseToken: b.purchaseToken as string, nonce: b.nonce, integrityToken: b.integrityToken as string };
}

export const sha256Hex = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");

/** Must match the app (src/state/proCheck.ts): the app hands this text to Play, which keeps only its SHA-256. */
export const requestText = (r: Pick<CheckRequest, "installId" | "purchaseToken" | "nonce">) => `${r.installId}|${r.purchaseToken}|${r.nonce}`;

export type IntegrityResult =
  | { ok: true }
  /** Definitive: a modified or sideloaded copy. */
  | { ok: false; reason: "not-genuine" }
  /** The token doesn't belong to this request — refuse, but it isn't proof of anything. */
  | { ok: false; reason: "bad-request" }
  /** Google couldn't judge right now, or the token is old — the app tries again later. */
  | { ok: false; reason: "retry" };

/** Reads Google's decoded integrity verdict (decodeIntegrityToken response). */
export function checkIntegrity(decoded: unknown, r: CheckRequest, now: number): IntegrityResult {
  const p = ((decoded ?? {}) as { tokenPayloadExternal?: Record<string, any> }).tokenPayloadExternal ?? {};
  const req = p.requestDetails ?? {};
  if (req.requestPackageName !== PACKAGE || req.requestHash !== sha256Hex(requestText(r))) return { ok: false, reason: "bad-request" };
  const at = Number(req.timestampMillis);
  if (!Number.isFinite(at) || now - at > MAX_TOKEN_AGE_MS) return { ok: false, reason: "retry" };
  const app = p.appIntegrity ?? {};
  if (app.appRecognitionVerdict === "PLAY_RECOGNIZED" && app.packageName === PACKAGE) return { ok: true };
  if (app.appRecognitionVerdict === "UNRECOGNIZED_VERSION") return { ok: false, reason: "not-genuine" };
  // UNEVALUATED: Google didn't judge the app this time (e.g. a device check failed). Not proof — retry.
  return { ok: false, reason: "retry" };
}

export type SubscriptionResult = { pro: true; tier: Tier; until: number } | { pro: false; reason: "no-purchase" | "expired" };

const LIVE_STATES = new Set(["SUBSCRIPTION_STATE_ACTIVE", "SUBSCRIPTION_STATE_IN_GRACE_PERIOD", "SUBSCRIPTION_STATE_CANCELED"]);

/** Reads Google Play's purchases.subscriptionsv2 answer. Cancelled subscriptions stay paid until they run out. */
export function checkSubscription(sub: unknown, now: number): SubscriptionResult {
  const s = (sub ?? {}) as { subscriptionState?: string; lineItems?: { productId?: string; expiryTime?: string }[] };
  const ours = (s.lineItems ?? []).filter((l) => tierOf(l.productId) !== null);
  if (!ours.length) return { pro: false, reason: "no-purchase" };
  if (!LIVE_STATES.has(s.subscriptionState ?? "")) return { pro: false, reason: "expired" };
  const live = ours.filter((l) => (Date.parse(l.expiryTime ?? "") || 0) > now);
  if (!live.length) return { pro: false, reason: "expired" };
  const tier: Tier = live.some((l) => tierOf(l.productId) === "pro") ? "pro" : "growth";
  const until = Math.max(...live.filter((l) => tierOf(l.productId) === tier).map((l) => Date.parse(l.expiryTime ?? "") || 0));
  return { pro: true, tier, until };
}

/** What the app trusts, once the signature checks out. */
export interface Verdict {
  v: 1;
  pkg: string;
  installId: string;
  /** First 16 hex of SHA-256(purchase token): ties the verdict to that purchase without storing it. */
  purchase: string;
  /** Paid (Growth or Pro). */
  pro: boolean;
  /** Which plan is paid; null when not paid. */
  tier: Tier | null;
  /** Subscription paid until (ms); 0 when not paid. */
  until: number;
  checkedAt: number;
  reason?: "not-genuine" | "no-purchase" | "expired";
}

export function makeVerdict(r: CheckRequest, now: number, result: SubscriptionResult | { pro: false; reason: "not-genuine" }): Verdict {
  return {
    v: 1,
    pkg: PACKAGE,
    installId: r.installId,
    purchase: sha256Hex(r.purchaseToken).slice(0, 16),
    pro: result.pro,
    tier: result.pro ? result.tier : null,
    until: result.pro ? result.until : 0,
    checkedAt: now,
    ...(result.pro ? {} : { reason: result.reason }),
  };
}

/** Tells the app which Google Cloud project to ask Play Integrity with (0 = checks off). Signed, so it can't be faked. */
export interface CheckConfig {
  v: 1;
  kind: "config";
  pkg: string;
  cloud: number;
}

export function parseProjectNumber(raw: string | undefined): number {
  const n = Number((raw ?? "").trim());
  return Number.isSafeInteger(n) && n > 0 ? n : 0;
}

export const makeConfig = (cloud: number): CheckConfig => ({ v: 1, kind: "config", pkg: PACKAGE, cloud });

/** ECDSA P-256 / SHA-256, DER signature in base64 — what Android's SHA256withECDSA verifies. */
export function signVerdict(v: Verdict | CheckConfig, privateKeyPem: string): { payload: string; signature: string } {
  const payload = JSON.stringify(v);
  const signature = signData("sha256", Buffer.from(payload, "utf8"), { key: privateKeyPem, dsaEncoding: "der" }).toString("base64");
  return { payload, signature };
}

export interface ServiceAccount {
  client_email: string;
  private_key: string;
}

/** Env vars may hold the JSON itself or base64 of it; PEM newlines may arrive as "\n". */
export function parseServiceAccount(raw: string | undefined): ServiceAccount | null {
  if (!raw) return null;
  try {
    const text = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const sa = JSON.parse(text) as Partial<ServiceAccount>;
    if (!sa.client_email || !sa.private_key) return null;
    return { client_email: sa.client_email, private_key: sa.private_key.replace(/\\n/g, "\n") };
  } catch {
    return null;
  }
}

export const pemFromEnv = (raw: string | undefined) => (raw ? raw.replace(/\\n/g, "\n").trim() : null);

const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

/** Signed JWT for Google's OAuth token endpoint (service-account flow). */
export function serviceAccountJwt(sa: ServiceAccount, scopes: string[], nowSec: number): string {
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: sa.client_email, scope: scopes.join(" "), aud: "https://oauth2.googleapis.com/token", iat: nowSec, exp: nowSec + 3600 }),
  );
  const sig = createSign("RSA-SHA256").update(`${head}.${claims}`).sign(sa.private_key);
  return `${head}.${claims}.${b64url(sig)}`;
}
