import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-3xl text-wood-900 mb-4">Thank you for your order</h1>
      <p className="text-wood-700 mb-8">
        Your payment was successful. You will receive a confirmation email shortly.
        Please note that a monthly maintenance fee of 50% of the product price will apply as outlined in our Terms.
      </p>
      <Link href="/shop" className="inline-block bg-wood-900 text-white px-6 py-3 rounded hover:bg-wood-800">
        Continue Shopping
      </Link>
    </div>
  );
}
