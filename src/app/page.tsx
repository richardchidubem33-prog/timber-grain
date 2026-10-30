import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      <section className="relative bg-wood-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-wood-600 mb-3">
              Handcrafted · Timeless · Yours
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-wood-950 leading-tight mb-6">
              Handcrafted wood.<br />
              Made for real life.
            </h1>
            <p className="text-wood-700 text-lg mb-8 max-w-md leading-relaxed">
              Thoughtfully handmade kitchenware from natural wood. Beautiful objects, built to last.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-wood-900 text-wood-50 text-sm font-medium rounded hover:bg-wood-800 transition"
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-wood-400 text-wood-800 text-sm font-medium rounded hover:bg-wood-200 transition"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80"
              alt="Handcrafted wooden kitchenware"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-2xl text-wood-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Cutting Boards", href: "/shop?category=cutting-boards", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
            { name: "Utensils", href: "/shop?category=utensils", img: "https://images.unsplash.com/photo-1585515320310-259814833e71?w=600&q=80" },
            { name: "Bowls & Serving", href: "/shop?category=bowls", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.href} className="group block">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="font-medium text-wood-900 group-hover:underline">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-wood-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-2xl text-wood-900">Featured Pieces</h2>
            <Link href="/shop" className="text-sm text-wood-700 hover:text-wood-950 underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="font-medium text-wood-900 mb-2">Handcrafted</h3>
            <p className="text-sm text-wood-600">Made by skilled artisans with time-honored techniques.</p>
          </div>
          <div>
            <h3 className="font-medium text-wood-900 mb-2">Sustainable</h3>
            <p className="text-sm text-wood-600">Sourced from responsibly managed forests.</p>
          </div>
          <div>
            <h3 className="font-medium text-wood-900 mb-2">Built to Last</h3>
            <p className="text-sm text-wood-600">Durable designs that stand the test of time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
