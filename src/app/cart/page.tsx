"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/utils";
import { getCartTotal } from "@/lib/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const { currency } = useCurrency();
  const total = getCartTotal(items);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl text-wood-900 mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-wood-700 underline hover:text-wood-950">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl text-wood-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4 border-b border-wood-200 pb-6">
              <div className="relative w-24 h-24 rounded overflow-hidden bg-wood-100 flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-wood-900">{item.name}</h3>
                <p className="text-sm text-wood-600">
                  {item.size} · {item.color}
                </p>
                <p className="text-wood-800 mt-1">{formatPrice(item.price, currency)}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-wood-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="px-2 py-1"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-sm text-wood-500 hover:text-wood-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-wood-100 rounded-lg p-6 h-fit">
          <h2 className="font-medium text-wood-900 mb-4">Order Summary</h2>
          <div className="flex justify-between text-wood-700 mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(total, currency)}</span>
          </div>
          <p className="text-xs text-wood-500 mb-6">
            Shipping calculated at checkout. A monthly maintenance fee of 50% of the product price will apply after purchase (see Terms).
          </p>
          <Link
            href="/checkout"
            className="block w-full text-center bg-wood-900 text-white py-3 rounded font-medium hover:bg-wood-800 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
