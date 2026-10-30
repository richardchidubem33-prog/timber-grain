"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/utils";
import { getCartTotal } from "@/lib/cart";
import Link from "next/link";

export default function CheckoutPage() {
  const { items } = useCart();
  const { currency } = useCurrency();
  const total = getCartTotal(items);

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
  });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Your cart is empty.</p>
        <Link href="/shop" className="underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  const handlePay = async () => {
    if (!accepted) {
      setError("Please accept the terms and monthly maintenance fee to continue.");
      return;
    }
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
          amount: total,
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl text-wood-900 mb-8">Checkout</h1>

      <div className="space-y-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Full Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-800 mb-1">Shipping Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-wood-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-wood-500"
            rows={3}
          />
        </div>
      </div>

      <div className="bg-wood-100 rounded-lg p-6 mb-8">
        <h2 className="font-medium mb-4">Order Summary</h2>
        {items.map((item) => (
          <div key={item.variantId} className="flex justify-between text-sm mb-2">
            <span>
              {item.name} ({item.size}) × {item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity, currency)}</span>
          </div>
        ))}
        <div className="border-t border-wood-300 mt-4 pt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(total, currency)}</span>
        </div>
      </div>

      <div className="border border-wood-300 rounded-lg p-4 mb-6 bg-wood-50">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-wood-800 leading-relaxed">
            By completing this purchase, you agree to a monthly maintenance fee equal to fifty percent (50%) of the product price. This fee supports ongoing care, quality assurance, and continued service related to your handcrafted piece. You may cancel at any time. Full details are available in our{" "}
            <Link href="/terms" className="underline">Terms & Conditions</Link>.
          </span>
        </label>
      </div>

      {error && <p className="text-red-700 text-sm mb-4">{error}</p>}

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-wood-900 text-white py-3.5 rounded font-medium hover:bg-wood-800 transition disabled:opacity-60"
      >
        {loading ? "Processing..." : `Pay ${formatPrice(total, currency)} with Flutterwave`}
      </button>

      <p className="text-xs text-wood-500 text-center mt-4">
        Guest checkout — no account required. Secure payment powered by Flutterwave.
      </p>
    </div>
  );
}
