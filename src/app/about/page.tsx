import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <section className="bg-wood-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl text-wood-950 mb-6">Our Story</h1>
          <p className="text-lg text-wood-700 leading-relaxed">
            Timber & Grain was born from a simple belief: everyday objects should be beautiful, lasting, and made with care.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-wood-700 leading-relaxed">
        <p>
          We work with skilled artisans who select each piece of wood for its character — the grain, the colour, the quiet strength that only natural materials possess. Every chopping board, spoon, and bowl is shaped by hand, finished with food-safe oils, and made to be used for years, not seasons.
        </p>
        <p>
          In a world of mass production, we choose the slower path. Small batches. Honest materials. Objects that improve with age and use.
        </p>
        <p>
          When you bring a Timber & Grain piece into your kitchen, you’re not just buying a tool. You’re inviting a little more warmth, intention, and craft into the everyday rituals of cooking and gathering.
        </p>
      </section>

      <section className="bg-wood-900 text-wood-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-2xl mb-4">Ready to bring craft into your kitchen?</h2>
          <Link
            href="/shop"
            className="inline-block mt-4 px-6 py-3 bg-wood-50 text-wood-900 rounded font-medium hover:bg-wood-200 transition"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
