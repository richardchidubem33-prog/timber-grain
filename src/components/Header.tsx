"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useCurrency, currencies } from "./CurrencyProvider";
import { ShoppingBag } from "lucide-react";

export function Header() {
  const { totalItems } = useCart();
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-50 bg-wood-50/95 backdrop-blur border-b border-wood-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-xl tracking-tight text-wood-900">
            Timber & Grain
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-wood-700">
            <Link href="/shop" className="hover:text-wood-950 transition">Shop</Link>
            <Link href="/shop?category=cutting-boards" className="hover:text-wood-950 transition">Boards</Link>
            <Link href="/shop?category=utensils" className="hover:text-wood-950 transition">Utensils</Link>
            <Link href="/shop?category=bowls" className="hover:text-wood-950 transition">Bowls</Link>
            <Link href="/about" className="hover:text-wood-950 transition">Our Story</Link>
          </nav>

          <div className="flex items-center gap-4">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="text-sm bg-transparent border border-wood-300 rounded px-2 py-1 text-wood-800 focus:outline-none focus:ring-1 focus:ring-wood-500"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>

            <Link href="/cart" className="relative p-2 text-wood-800 hover:text-wood-950">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-wood-800 text-wood-50 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
