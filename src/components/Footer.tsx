import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-wood-900 text-wood-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg mb-4">Timber & Grain</h3>
            <p className="text-sm text-wood-300 leading-relaxed">
              Handcrafted wooden kitchenware made with care. Beautiful objects for everyday rituals.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-wood-300">
              <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
              <li><Link href="/shop?category=cutting-boards" className="hover:text-white">Cutting Boards</Link></li>
              <li><Link href="/shop?category=utensils" className="hover:text-white">Utensils</Link></li>
              <li><Link href="/shop?category=bowls" className="hover:text-white">Bowls & Serving</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-wood-300">
              <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <p className="text-sm text-wood-300">hello@timberandgrain.com</p>
          </div>
        </div>
        <div className="border-t border-wood-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-wood-400">
          <p>© {new Date().getFullYear()} Timber & Grain. All rights reserved.</p>
          <p>Handcrafted with care. Built to last.</p>
        </div>
      </div>
    </footer>
  );
}
