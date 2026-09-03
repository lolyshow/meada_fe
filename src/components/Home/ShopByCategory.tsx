"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Meat",
    description: "Fresh cuts for every meal",
    href: "/shop-without-sidebar?category=Lamp",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fish",
    description: "Fresh fish and seafood",
    href: "/shop-without-sidebar?category=Fish",
    image:
      "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chicken",
    description: "Quality fresh chicken",
    href: "/shop-without-sidebar?category=Chicken",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vegetables",
    description: "Fresh and healthy vegetables",
    href: "/shop-without-sidebar?category=Vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  },
];

const ShopByCategory = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        {/* Section heading */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Explore our selection
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Shop by Category
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-gray-600">
            Everything you need for delicious meals, carefully selected and
            delivered fresh to you.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-100"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    {category.description}
                  </p>

                  <span className="mt-3 inline-block text-sm font-semibold opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Shop now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
