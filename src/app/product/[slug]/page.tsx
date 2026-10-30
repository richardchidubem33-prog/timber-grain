"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { currency } = useCurrency();

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const colors = Array.from(new Set(product.variants.map((v) => v.color)));

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: selectedVariant.price,
      quantity,
      image: product.images[0],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-wood-100 mb-4">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-20 h-20 rounded overflow-hidden border-2 ${
                  activeImage === i ? "border-wood-800" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl text-wood-900 mb-2">{product.name}</h1>
          <p className="text-2xl text-wood-800 mb-6">
            {formatPrice(selectedVariant.price, currency)}
          </p>
          <p className="text-wood-700 leading-relaxed mb-8">{product.description}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-wood-800 mb-2">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const variant =
                  product.variants.find((v) => v.size === size && v.color === selectedVariant.color) ||
                  product.variants.find((v) => v.size === size);
                return (
                  <button
                    key={size}
                    onClick={() => variant && setSelectedVariant(variant)}
                    className={`px-4 py-2 text-sm border rounded ${
                      selectedVariant.size === size
                        ? "border-wood-900 bg-wood-900 text-white"
                        : "border-wood-300 hover:border-wood-500"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-wood-800 mb-2">Color / Finish</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const variant =
                  product.variants.find((v) => v.color === color && v.size === selectedVariant.size) ||
                  product.variants.find((v) => v.color === color);
                return (
                  <button
                    key={color}
                    onClick={() => variant && setSelectedVariant(variant)}
                    className={`px-4 py-2 text-sm border rounded ${
                      selectedVariant.color === color
                        ? "border-wood-900 bg-wood-900 text-white"
                        : "border-wood-300 hover:border-wood-500"
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-wood-300 rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-wood-700">−</button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-wood-700">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-wood-900 text-white py-3 rounded font-medium hover:bg-wood-800 transition"
            >
              Add to Cart
            </button>
          </div>

          <p className="text-sm text-wood-600 leading-relaxed">{product.longDescription}</p>
        </div>
      </div>

      <section className="mt-16 border-t border-wood-200 pt-12">
        <h2 className="font-serif text-2xl text-wood-900 mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b border-wood-100 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? "fill-wood-700 text-wood-700" : "text-wood-300"}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-wood-900">{review.author}</span>
                <span className="text-xs text-wood-500">{review.date}</span>
              </div>
              <p className="text-wood-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
