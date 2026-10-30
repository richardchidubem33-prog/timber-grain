import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency, email, name, phone, items } = body;

    const secretKey = process.env.FLW_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { status: "error", message: "Payment gateway not configured. Add FLW_SECRET_KEY in environment variables." },
        { status: 500 }
      );
    }

    const tx_ref = `TG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const payload = {
      tx_ref,
      amount: currency === "NGN" ? Math.round(Number(amount) * 1600) : Number(amount),
      currency: currency || "USD",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success`,
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
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
