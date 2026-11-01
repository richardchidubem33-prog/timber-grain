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

// Dedicated local product photography keeps every item semantically accurate and avoids
// remote stock-image failures or unrelated photos being reused across the catalog.
const productImage = (slug: string) => `/products/${slug}.jpg`;

export const products: Product[] = [
  {
    id: "1",
    slug: "walnut-chopping-board",
    name: "Walnut Chopping Board",
    description: "Solid walnut board with deep grain, perfect for everyday prep.",
    longDescription: "Handcrafted from sustainably sourced American black walnut. Each board is unique with rich, swirling grain patterns. Finished with food-safe mineral oil and beeswax.",
    category: "cutting-boards",
    basePrice: 89,
    images: [productImage("walnut-chopping-board")],
    variants: [
      { id: "1-s-natural", size: "Small (30×20cm)", color: "Natural", price: 89, stock: 12 },
      { id: "1-m-natural", size: "Medium (40×28cm)", color: "Natural", price: 129, stock: 8 },
      { id: "1-l-natural", size: "Large (50×35cm)", color: "Natural", price: 179, stock: 5 },
    ],
    reviews: [
      { id: "r1", author: "Amara O.", rating: 5, comment: "Beautiful board. The grain is stunning.", date: "2026-09-12" },
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "olive-wood-spoon-set",
    name: "Olive Wood Spoon Set",
    description: "Set of three hand-carved olive wood spoons.",
    longDescription: "Carved from Mediterranean olive wood. Each piece shows unique grain. Lightweight yet durable.",
    category: "utensils",
    basePrice: 65,
    images: [productImage("olive-wood-spoon-set")],
    variants: [
      { id: "2-std-natural", size: "Standard Set (3 pcs)", color: "Natural", price: 65, stock: 20 },
      { id: "2-lg-natural", size: "Large Set (5 pcs)", color: "Natural", price: 95, stock: 10 },
    ],
    reviews: [
      { id: "r4", author: "Chidi E.", rating: 5, comment: "Gorgeous set.", date: "2026-09-01" },
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "teak-serving-bowl",
    name: "Teak Serving Bowl",
    description: "Large hand-turned teak bowl for salads and serving.",
    longDescription: "Turned from a single piece of teak. Smooth interior and exterior. Food-safe finish.",
    category: "bowls",
    basePrice: 110,
    images: [productImage("teak-serving-bowl")],
    variants: [
      { id: "3-m-natural", size: "Medium (25cm)", color: "Natural", price: 110, stock: 7 },
      { id: "3-l-natural", size: "Large (32cm)", color: "Natural", price: 155, stock: 4 },
    ],
    reviews: [
      { id: "r6", author: "Ifeanyi N.", rating: 5, comment: "Stunning bowl.", date: "2026-09-20" },
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "maple-plate-set",
    name: "Maple Dinner Plate Set",
    description: "Set of four hand-turned maple plates.",
    longDescription: "Light maple wood with subtle figure. Gently curved rims.",
    category: "plates",
    basePrice: 145,
    images: [productImage("maple-plate-set")],
    variants: [
      { id: "4-4pc-natural", size: "4-Piece Set", color: "Natural", price: 145, stock: 9 },
      { id: "4-6pc-natural", size: "6-Piece Set", color: "Natural", price: 210, stock: 5 },
    ],
    reviews: [
      { id: "r7", author: "Ngozi A.", rating: 5, comment: "Elegant and practical.", date: "2026-08-05" },
    ],
  },
  {
    id: "5",
    slug: "oak-bread-board",
    name: "Oak Bread & Charcuterie Board",
    description: "Long oak board with juice groove and handle.",
    longDescription: "European oak with a generous juice channel and integrated handle.",
    category: "cutting-boards",
    basePrice: 98,
    images: [productImage("oak-bread-board")],
    variants: [
      { id: "5-std-natural", size: "Standard (45×18cm)", color: "Natural", price: 98, stock: 11 },
      { id: "5-xl-natural", size: "XL (60×22cm)", color: "Natural", price: 148, stock: 4 },
    ],
    reviews: [
      { id: "r9", author: "Blessing O.", rating: 5, comment: "Perfect for entertaining.", date: "2026-09-05" },
    ],
  },
  {
    id: "6",
    slug: "acacia-spatula-set",
    name: "Acacia Wood Spatula Set",
    description: "Three-piece spatula and turner set in rich acacia wood.",
    longDescription: "Strong and heat-resistant acacia wood spatulas. Smooth finish that is gentle on non-stick pans.",
    category: "utensils",
    basePrice: 48,
    images: [productImage("acacia-spatula-set")],
    variants: [
      { id: "6-std", size: "Standard Set (3 pcs)", color: "Natural", price: 48, stock: 18 },
      { id: "6-pro", size: "Pro Set (5 pcs)", color: "Natural", price: 72, stock: 9 },
    ],
    reviews: [
      { id: "r10", author: "Tunde A.", rating: 5, comment: "Great quality.", date: "2026-09-18" },
    ],
    featured: true,
  },
  {
    id: "7",
    slug: "bamboo-salad-servers",
    name: "Bamboo Salad Servers",
    description: "Elegant bamboo salad servers with smooth curves.",
    longDescription: "Lightweight yet strong bamboo servers. Perfect for salads and serving.",
    category: "utensils",
    basePrice: 38,
    images: [productImage("bamboo-salad-servers")],
    variants: [
      { id: "7-std", size: "Standard Pair", color: "Natural", price: 38, stock: 25 },
    ],
    reviews: [],
  },
  {
    id: "8",
    slug: "cherry-wood-mortar",
    name: "Cherry Wood Mortar & Pestle",
    description: "Hand-turned cherry wood mortar and pestle.",
    longDescription: "Dense cherry wood that develops a beautiful patina. Ideal for grinding spices and herbs.",
    category: "bowls",
    basePrice: 78,
    images: [productImage("cherry-wood-mortar")],
    variants: [
      { id: "8-std", size: "Standard", color: "Natural", price: 78, stock: 10 },
      { id: "8-large", size: "Large", color: "Natural", price: 98, stock: 6 },
    ],
    reviews: [
      { id: "r11", author: "Adaeze M.", rating: 5, comment: "Heavy and well made.", date: "2026-08-30" },
    ],
  },
  {
    id: "9",
    slug: "walnut-rolling-pin",
    name: "Walnut Rolling Pin",
    description: "Solid walnut French-style rolling pin.",
    longDescription: "Tapered French-style rolling pin made from a single piece of walnut. Perfect weight and balance.",
    category: "utensils",
    basePrice: 55,
    images: [productImage("walnut-rolling-pin")],
    variants: [
      { id: "9-std", size: "Standard (45cm)", color: "Natural", price: 55, stock: 14 },
    ],
    reviews: [],
  },
  {
    id: "10",
    slug: "mixed-wood-utensil-crock",
    name: "Mixed Wood Utensil Crock",
    description: "Handcrafted utensil holder in mixed hardwoods.",
    longDescription: "Sturdy crock made from a mix of walnut, maple and oak. Keeps your favourite wooden utensils organised.",
    category: "bowls",
    basePrice: 68,
    images: [productImage("mixed-wood-utensil-crock")],
    variants: [
      { id: "10-std", size: "Standard", color: "Natural Mix", price: 68, stock: 8 },
    ],
    reviews: [],
    featured: true,
  },
  {
    id: "11",
    slug: "wooden-measuring-spoons-set",
    name: "Wooden Measuring Spoon Set",
    description: "Warm-toned hardwood measuring spoons marked with clear 15, 30, and 60 ml measures.",
    longDescription: "A practical set of hand-finished wooden measuring spoons with contrasting grain bands and easy-to-read volume markings. A beautiful everyday baking and kitchen essential.",
    category: "utensils",
    basePrice: 20,
    images: [productImage("wooden-measuring-spoons-set")],
    variants: [
      { id: "11-3pc-natural", size: "3-Piece Set", color: "Natural Wood", price: 20, stock: 20 },
      { id: "11-5pc-natural", size: "5-Piece Set", color: "Natural Wood", price: 32, stock: 12 },
    ],
    reviews: [],
    featured: true,
  },
  {
    id: "12",
    slug: "decorative-inlay-cutting-board",
    name: "Decorative Inlay Cutting Board",
    description: "Light hardwood cutting board with a dark wood handle and hand-set looping inlay.",
    longDescription: "A distinctive serving and prep board combining pale hardwood, a rich walnut-toned handle, brass-toned fasteners, and a flowing decorative inlay. Designed to move from kitchen prep to table presentation.",
    category: "cutting-boards",
    basePrice: 75,
    images: [productImage("decorative-inlay-cutting-board")],
    variants: [
      { id: "12-standard-natural", size: "Standard Board", color: "Light Wood & Walnut", price: 75, stock: 10 },
      { id: "12-large-natural", size: "Large Board", color: "Light Wood & Walnut", price: 100, stock: 6 },
    ],
    reviews: [],
    featured: true,
  },
  {
    id: "13",
    slug: "geometric-inlay-paper-towel-holder",
    name: "Geometric Inlay Paper Towel Holder",
    description: "Solid wood paper towel holder with a hand-built geometric inlay and weighted base.",
    longDescription: "A sculptural countertop paper towel holder crafted from dark hardwood with a warm geometric chevron inlay. The broad base keeps the roll steady while the vertical handle makes changing rolls simple.",
    category: "utensils",
    basePrice: 45,
    images: [productImage("geometric-inlay-paper-towel-holder")],
    variants: [
      { id: "13-standard-walnut", size: "Single Holder", color: "Walnut & Geometric Inlay", price: 45, stock: 10 },
    ],
    reviews: [],
  },
  {
    id: "14",
    slug: "walnut-serving-plate-set",
    name: "Walnut Serving Plate Set",
    description: "Rich walnut serving plates and trays with softly raised rims and natural grain.",
    longDescription: "A versatile collection of hand-finished walnut plates and serving trays with softly rounded edges. Ideal for everyday dining, shared dishes, and relaxed entertaining.",
    category: "plates",
    basePrice: 60,
    images: [productImage("walnut-serving-plate-set")],
    variants: [
      { id: "14-2pc-walnut", size: "2-Piece Set", color: "Dark Walnut", price: 60, stock: 10 },
      { id: "14-4pc-walnut", size: "4-Piece Set", color: "Dark Walnut", price: 100, stock: 5 },
    ],
    reviews: [],
    featured: true,
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
