import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const title =
    category === "cutting-boards"
      ? "Cutting Boards"
      : category === "utensils"
      ? "Utensils"
      : category === "bowls"
      ? "Bowls & Serving"
      : category === "plates"
      ? "Plates"
      : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl text-wood-900 mb-2">{title}</h1>
      <p className="text-wood-600 mb-10">{filtered.length} pieces</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
