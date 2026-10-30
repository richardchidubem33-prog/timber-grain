export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  color: string;
  price: number; // USD
  quantity: number;
  image: string;
};

export type Cart = {
  items: CartItem[];
  currency: string;
};

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
