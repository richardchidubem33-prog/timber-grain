"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/utils";
import { getCartTotal } from "@/lib/cart";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { currency } = useCurrency();
  const subtotal = getCartTotal(items);

  const discount = subtotal >= 500 ? subtotal * 0.1 : 0;
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * 0.05;

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
  });
  const [tip, setTip] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"flutterwave" | "bank">("flutterwave");
  const [bankCurrency, setBankCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const [transactionId, setTransactionId] = useState("");
  const [bankSubmitted, setBankSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const grandTotal = afterDiscount + tax + tip;

  if (items.length === 0 && !bankSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Your cart is empty.</p>
        <Link href="/shop" className="underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  if (bankSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-wood-900 mb-4">Order in Review</h1>
        <p className="text-wood-700 mb-6">
          Thank you. Your bank transfer order has been received and is currently under review.
          We will confirm your payment once the transaction is verified.
        </p>
        {transactionId && (
          <p className="text-sm text-wood-600 mb-6">
            Transaction ID submitted: <strong>{transactionId}</strong>
          </p>
        )}
        <Link href="/shop" className="inline-block bg-wood-900 text-white px-6 py-3 rounded hover:bg-wood-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleFlutterwave = async () => {
    if (!form.email || !form.name) {
      setError("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/flutterwave/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          currency: currency === "NGN" ? "NGN" : "USD",
          email: form.email,
          name: form.name,
          phone: form.phone,
          items: items.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            variant: `${i.size} / ${i.color}`,
          })),
        }),
      });
      const data = await res.json();
      if (data.status === "success" && data.data?.link) {
        window.location.href = data.data.link;
      } else {
        setError(data.message || "Unable to initialize payment. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBankTransfer = () => {
    if (!form.email || !form.name) {
      setError("Please fill in your name and email.");
      return;
    }
    setBankSubmitted(true);
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl text-wood-900 mb-8">Checkout</h1>

      {/* Customer details */}
      <div className="space-y-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Full Name *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Email *</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Shipping Address</label>
          <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500" rows={3} />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-wood-100 rounded-lg p-6 mb-8">
        <h2 className="font-medium mb-4">Order Summary</h2>
        {items.map((item) => (
          <div key={item.variantId} className="flex justify-between text-sm mb-2">
            <span>{item.name} ({item.size}) × {item.quantity}</span>
            <span>{formatPrice(item.price * item.quantity, currency)}</span>
          </div>
        ))}
        <div className="border-t border-wood-300 mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span></div>
          {discount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount (10% off orders $500+)</span>
              <span>-{formatPrice(discount, currency)}</span>
            </div>
          )}
          <div className="flex justify-between"><span>Tax (5%)</span><span>{formatPrice(tax, currency)}</span></div>
          <div className="flex justify-between items-center">
            <span>Tip (optional)</span>
            <input type="number" min={0} step={1} value={tip || ""} onChange={(e) => setTip(Number(e.target.value) || 0)}
              className="w-24 border border-wood-300 rounded px-2 py-1 text-right" placeholder="0" />
          </div>
          <div className="flex justify-between font-medium text-base pt-2 border-t border-wood-300">
            <span>Total</span>
            <span>{formatPrice(grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h2 className="font-medium mb-4">Payment Method</h2>
        <div className="flex gap-4 mb-6">
          <button onClick={() => setPaymentMethod("flutterwave")}
            className={`flex-1 py-3 rounded border text-sm font-medium ${
              paymentMethod === "flutterwave" ? "border-wood-900 bg-wood-900 text-white" : "border-wood-300"
            }`}>
            Flutterwave
          </button>
          <button onClick={() => setPaymentMethod("bank")}
            className={`flex-1 py-3 rounded border text-sm font-medium ${
              paymentMethod === "bank" ? "border-wood-900 bg-wood-900 text-white" : "border-wood-300"
            }`}>
            Bank Transfer
          </button>
        </div>

        {paymentMethod === "bank" && (
          <div className="border border-wood-300 rounded-lg p-5 bg-wood-50 space-y-4">
            <div className="flex gap-2 mb-4">
              {(["USD", "EUR", "GBP"] as const).map((c) => (
                <button key={c} onClick={() => setBankCurrency(c)}
                  className={`px-3 py-1.5 text-sm rounded border ${
                    bankCurrency === c ? "border-wood-900 bg-wood-900 text-white" : "border-wood-300"
                  }`}>{c}</button>
              ))}
            </div>

            {bankCurrency === "USD" && (
              <div className="text-sm space-y-2 text-wood-800">
                <p><strong>Account name:</strong> Richard</p>
                <p><strong>Bank name:</strong> Lead Bank</p>
                <p><strong>Account number:</strong> 211563375088</p>
                <p><strong>Routing number:</strong> 101019644</p>
                <p><strong>Account type:</strong> Checking</p>
                <p><strong>Bank address:</strong> 1801 Main St. Kansas City, MO 64108, USA</p>
              </div>
            )}
            {bankCurrency === "EUR" && (
              <div className="text-sm space-y-2 text-wood-800">
                <p><strong>Account name:</strong> Richard</p>
                <p><strong>Bank name:</strong> Clear Junction Limited</p>
                <p><strong>IBAN:</strong> GB78CLJU04130744401125</p>
                <p><strong>BIC:</strong> CLJUGB21XXX</p>
                <p><strong>Bank address:</strong> 307 Euston Rd, London, NW1 3AD</p>
              </div>
            )}
            {bankCurrency === "GBP" && (
              <div className="text-sm space-y-2 text-wood-800">
                <p><strong>Account name:</strong> Richard</p>
                <p><strong>Bank name:</strong> Clear Junction Limited</p>
                <p><strong>Account number:</strong> 44401125</p>
                <p><strong>Sort code:</strong> 041307</p>
                <p><strong>IBAN:</strong> GB78CLJU04130744401125</p>
              </div>
            )}

            <div className="pt-4">
              <label className="block text-sm font-medium text-wood-800 mb-1">Transaction ID (optional)</label>
              <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)}
                className="w-full border border-wood-300 rounded px-3 py-2" placeholder="Paste your transfer reference" />
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-700 text-sm mb-4">{error}</p>}

      {paymentMethod === "flutterwave" ? (
        <button onClick={handleFlutterwave} disabled={loading}
          className="w-full bg-wood-900 text-white py-3.5 rounded font-medium hover:bg-wood-800 transition disabled:opacity-60">
          {loading ? "Processing..." : `Pay ${formatPrice(grandTotal, currency)} with Flutterwave`}
        </button>
      ) : (
        <button onClick={handleBankTransfer}
          className="w-full bg-wood-900 text-white py-3.5 rounded font-medium hover:bg-wood-800 transition">
          I have made the transfer — Submit Order
        </button>
      )}

      <p className="text-xs text-wood-500 text-center mt-4">
        Guest checkout — no account required.
      </p>
    </div>
  );
}
