import { NextRequest, NextResponse } from "next/server";
import { createCheckoutState } from "@/lib/flutterwave";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency, email, name, phone, items } = body;
    const secretKey = process.env.FLW_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { status: "error", message: "Payment gateway not configured. Add FLW_SECRET_KEY in environment variables." },
        { status: 500 },
      );
    }

    const tx_ref = `TG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const normalizedCurrency = currency || "USD";
    const chargeAmount = normalizedCurrency === "NGN" ? Math.round(Number(amount) * 1600) : Number(amount);

    if (!Number.isFinite(chargeAmount) || chargeAmount <= 0 || !email) {
      return NextResponse.json({ status: "error", message: "A valid amount and customer email are required." }, { status: 400 });
    }

    const state = createCheckoutState({ txRef: tx_ref, amount: chargeAmount, currency: normalizedCurrency });
    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success`);
    redirectUrl.searchParams.set("state", state);

    const payload = {
      tx_ref,
      amount: chargeAmount,
      currency: normalizedCurrency,
      redirect_url: redirectUrl.toString(),
      customer: {
        email,
        name,
        phonenumber: phone || "",
      },
      customizations: {
        title: "Timber & Grain",
        description: "Handcrafted wooden kitchenware",
      },
      meta: {
        items: JSON.stringify(items),
        maintenance_fee_percent: "50",
      },
    };

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.ok ? 200 : 502 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to initialize payment" },
      { status: 500 },
    );
  }
}
