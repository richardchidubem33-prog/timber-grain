import { createHmac, timingSafeEqual } from "crypto";

type CheckoutState = {
  txRef: string;
  amount: number;
  currency: string;
  exp: number;
};

function getSigningKey() {
  return process.env.FLW_SECRET_KEY || "";
}

export function createCheckoutState(state: Omit<CheckoutState, "exp">) {
  const payload: CheckoutState = { ...state, exp: Date.now() + 30 * 60 * 1000 };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getSigningKey()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function readCheckoutState(token: string): CheckoutState | null {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature || !getSigningKey()) return null;

    const expected = createHmac("sha256", getSigningKey()).update(encoded).digest("base64url");
    const providedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (providedBuffer.length !== expectedBuffer.length || !timingSafeEqual(providedBuffer, expectedBuffer)) {
      return null;
    }

    const state = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as CheckoutState;
    if (!state.txRef || !state.currency || !Number.isFinite(state.amount) || state.exp < Date.now()) return null;
    return state;
  } catch {
    return null;
  }
}
