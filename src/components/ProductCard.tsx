"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCurrency } from "./CurrencyProvider";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { currency } = useCurrency();
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-wood-100 mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="font-medium text-wood-900 group-hover:underline">{product.name}</h3>
      <p className="text-sm text-wood-600 mt-1">From {formatPrice(minPrice, currency)}</p>
    </Link>
  );
}
