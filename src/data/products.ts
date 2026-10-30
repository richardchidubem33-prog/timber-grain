export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: "cutting-boards" | "utensils" | "bowls" | "plates";
  basePrice: number;
  images: string[];
  variants: ProductVariant[];
  reviews: Review[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "walnut-chopping-board",
    name: "Walnut Chopping Board",
    description: "Solid walnut board with deep grain, perfect for everyday prep.",
    longDescription: "Handcrafted from sustainably sourced American black walnut. Each board is unique with rich, swirling grain patterns. Finished with food-safe mineral oil and beeswax. Built to last generations.",
    category: "cutting-boards",
    basePrice: 89,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    ],
    variants: [
      { id: "1-s-natural", size: "Small (30×20cm)", color: "Natural", price: 89, stock: 12 },
      { id: "1-m-natural", size: "Medium (40×28cm)", color: "Natural", price: 129, stock: 8 },
      { id: "1-l-natural", size: "Large (50×35cm)", color: "Natural", price: 179, stock: 5 },
      { id: "1-m-dark", size: "Medium (40×28cm)", color: "Dark Oil", price: 139, stock: 6 },
    ],
    reviews: [
      { id: "r1", author: "Amara O.", rating: 5, comment: "Beautiful board. The grain is stunning and it feels solid.", date: "2026-09-12" },
      { id: "r2", author: "James K.", rating: 5, comment: "Worth every naira. Heavy and well finished.", date: "2026-08-28" },
      { id: "r3", author: "Fatima B.", rating: 4, comment: "Love it. Slightly larger than expected but perfect.", date: "2026-07-15" },
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "olive-wood-spoon-set",
    name: "Olive Wood Spoon Set",
    description: "Set of three hand-carved olive wood spoons with natural oil finish.",
    longDescription: "Carved from Mediterranean olive wood. Each piece shows unique grain and colour variation. Lightweight yet durable. Ideal for cooking and serving.",
    category: "utensils",
    basePrice: 65,
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e71?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c28c2f1?w=800&q=80",
    ],
    variants: [
      { id: "2-std-natural", size: "Standard Set (3 pcs)", color: "Natural", price: 65, stock: 20 },
      { id: "2-lg-natural", size: "Large Set (5 pcs)", color: "Natural", price: 95, stock: 10 },
      { id: "2-std-oiled", size: "Standard Set (3 pcs)", color: "Deep Oil", price: 72, stock: 14 },
    ],
    reviews: [
      { id: "r4", author: "Chidi E.", rating: 5, comment: "Gorgeous set. The olive wood smell is amazing.", date: "2026-09-01" },
      { id: "r5", author: "Sarah M.", rating: 5, comment: "Perfect weight and balance.", date: "2026-08-10" },
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "teak-serving-bowl",
    name: "Teak Serving Bowl",
    description: "Large hand-turned teak bowl for salads and serving.",
    longDescription: "Turned from a single piece of teak. Smooth interior and exterior. Food-safe finish. Statement piece for the table.",
    category: "bowls",
    basePrice: 110,
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    ],
    variants: [
      { id: "3-m-natural", size: "Medium (25cm)", color: "Natural", price: 110, stock: 7 },
      { id: "3-l-natural", size: "Large (32cm)", color: "Natural", price: 155, stock: 4 },
      { id: "3-l-dark", size: "Large (32cm)", color: "Dark Stain", price: 165, stock: 3 },
    ],
    reviews: [
      { id: "r6", author: "Ifeanyi N.", rating: 5, comment: "Stunning bowl. Guests always ask about it.", date: "2026-09-20" },
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "maple-plate-set",
    name: "Maple Dinner Plate Set",
    description: "Set of four hand-turned maple plates.",
    longDescription: "Light maple wood with subtle figure. Gently curved rims. Ideal for everyday dining or special occasions.",
    category: "plates",
    basePrice: 145,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    ],
    variants: [
      { id: "4-4pc-natural", size: "4-Piece Set", color: "Natural", price: 145, stock: 9 },
      { id: "4-6pc-natural", size: "6-Piece Set", color: "Natural", price: 210, stock: 5 },
      { id: "4-4pc-honey", size: "4-Piece Set", color: "Honey Tone", price: 155, stock: 6 },
    ],
    reviews: [
      { id: "r7", author: "Ngozi A.", rating: 5, comment: "Elegant and practical. Love the warm tone.", date: "2026-08-05" },
      { id: "r8", author: "David T.", rating: 4, comment: "Beautiful craftsmanship.", date: "2026-07-22" },
    ],
  },
  {
    id: "5",
    slug: "oak-bread-board",
    name: "Oak Bread & Charcuterie Board",
    description: "Long oak board with juice groove and handle.",
    longDescription: "European oak with a generous juice channel and integrated handle. Perfect for bread, cheese, and charcuterie.",
    category: "cutting-boards",
    basePrice: 98,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c28c2f1?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    ],
    variants: [
      { id: "5-std-natural", size: "Standard (45×18cm)", color: "Natural", price: 98, stock: 11 },
      { id: "5-xl-natural", size: "XL (60×22cm)", color: "Natural", price: 148, stock: 4 },
    ],
    reviews: [
      { id: "r9", author: "Blessing O.", rating: 5, comment: "Perfect for entertaining.", date: "2026-09-05" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
