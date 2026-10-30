import { NextRequest, NextResponse } from "next/server";
import { readCheckoutState } from "@/lib/flutterwave";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const transactionId = params.get("transaction_id");
  const txRef = params.get("tx_ref");
  const callbackStatus = params.get("status");
  const stateToken = params.get("state");
  const secretKey = process.env.FLW_SECRET_KEY;

  if (!transactionId || !txRef || !stateToken) {
    return NextResponse.json({ status: "error", message: "Payment verification details are missing." }, { status: 400 });
  }

  if (callbackStatus !== "successful") {
    return NextResponse.json({ status: "failed", message: "The payment was not completed." });
  }

  if (!secretKey) {
    return NextResponse.json({ status: "error", message: "Payment verification is not configured." }, { status: 500 });
  }

  const state = readCheckoutState(stateToken);
  if (!state || state.txRef !== txRef) {
    return NextResponse.json({ status: "error", message: "The payment callback could not be trusted." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`, {
      method: "GET",
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: "no-store",
    });
    const result = await response.json();
    const transaction = result?.data;
    const amountMatches = Number(transaction?.amount) >= state.amount;
    const currencyMatches = transaction?.currency === state.currency;
    const referenceMatches = transaction?.tx_ref === state.txRef;
    const isSuccessful = transaction?.status === "successful";

    if (!response.ok || result?.status !== "success" || !isSuccessful || !amountMatches || !currencyMatches || !referenceMatches) {
      return NextResponse.json({ status: "failed", message: "Flutterwave could not confirm this payment." });
    }

    return NextResponse.json({
      status: "success",
      message: "Payment verified",
      data: { transactionId: String(transaction.id), txRef: transaction.tx_ref },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error", message: "Unable to verify payment right now." }, { status: 502 });
  }
}
