"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type VerificationState = "checking" | "success" | "failed" | "error";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerificationState>("checking");
  const [message, setMessage] = useState("Confirming your payment with Flutterwave…");

  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString());
    const stateToken = query.get("state");
    const transactionId = query.get("transaction_id");
    const txRef = query.get("tx_ref");
    const callbackStatus = query.get("status");

    if (!stateToken || !transactionId || !txRef || !callbackStatus) {
      setState("failed");
      setMessage("We could not confirm this payment. If you were charged, please contact support before trying again.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/flutterwave/verify?${query.toString()}`, { cache: "no-store" });
        const data = await res.json();
        if (data.status === "success") {
          setState("success");
          setMessage("Your payment has been confirmed by Flutterwave. You will receive a confirmation email shortly.");
        } else if (data.status === "failed") {
          setState("failed");
          setMessage(data.message || "Flutterwave did not confirm the payment. You can return to checkout and try another payment method.");
        } else {
          setState("error");
          setMessage(data.message || "We could not verify the payment right now. Please contact support before trying again.");
        }
      } catch {
        setState("error");
        setMessage("We could not reach the payment verification service. Please contact support before trying again.");
      }
    };

    void verify();
  }, [searchParams]);

  const heading = state === "checking"
    ? "Checking your payment"
    : state === "success"
      ? "Thank you for your order"
      : "Payment not confirmed";

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-3xl text-wood-900 mb-4">{heading}</h1>
      <p className="text-wood-700 mb-8">
        {message}
        {state === "success" && " Please note that a monthly maintenance fee of 50% of the product price will apply as outlined in our Terms."}
      </p>
      <Link href={state === "success" ? "/shop" : "/checkout"} className="inline-block bg-wood-900 text-white px-6 py-3 rounded hover:bg-wood-800">
        {state === "success" ? "Continue Shopping" : "Return to Checkout"}
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-4 py-20 text-center">Checking your payment…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
