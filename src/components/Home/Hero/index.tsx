"use client";

import React, { useEffect } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector, selectProducts } from "@/redux/store";
import { fetchProducts } from "@/redux/features/products-slice";

const Hero = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // pick the first 2 products with images for the deal cards
  // fallback to any first 2 products if no images
  const dealProducts = [
    ...products.filter((p) => p.images.length > 0),
    ...products.filter((p) => p.images.length === 0),
  ].slice(0, 2);

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">

          {/* ── Left: Carousel ── */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />
              <HeroCarousel />
            </div>
          </div>

          {/* ── Right: Deal Cards ── */}
          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">

              {dealProducts.length > 0 ? (
                dealProducts.map((product) => (
                  <div
                    key={product._id}
                    className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-dark-4 text-custom-sm mb-1.5 uppercase tracking-wide">
                          Fresh Today
                        </p>
                        <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-4">
                          <Link href={`/products/${product._id}`}>
                            {product.title}
                          </Link>
                        </h2>
                        <p className="text-dark-4 text-sm mb-3 line-clamp-2">
                          {product.category}
                        </p>
                        <div>
                          <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                            limited time offer
                          </p>
                          <span className="flex items-center gap-3">
                            <span className="font-medium text-heading-5 text-red">
                              ₦{product.price.toLocaleString()}
                            </span>
                          </span>
                        </div>
                        <Link
                          href={`/products/${product._id}`}
                          className="inline-block mt-3 text-sm font-medium text-blue hover:underline"
                        >
                          Shop Now →
                        </Link>
                      </div>

                      {/* product image or category placeholder */}
                      <div className="flex-shrink-0">
                        {product.images.length > 0 ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-[100px] h-[100px] rounded-lg bg-gray-100 flex items-center justify-center text-4xl">
                            {getCategoryEmoji(product.category)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // skeleton while loading
                <>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 animate-pulse"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="h-3 w-20 bg-gray-200 rounded" />
                          <div className="h-5 w-32 bg-gray-200 rounded" />
                          <div className="h-3 w-24 bg-gray-200 rounded" />
                          <div className="h-6 w-16 bg-gray-200 rounded" />
                        </div>
                        <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Hero features */}
      <HeroFeature />
    </section>
  );
};

// maps category name to an emoji for products without images
function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Chicken: "🐔",
    Fish: "🐟",
    Beef: "🥩",
    Lamp: "🐑",
    Lamb: "🐑",
    Vegetables: "🥦",
    Vegetable: "🥦",
    Okra: "🌿",
    Tomato: "🍅",
    Pepper: "🌶️",
    Cucumber: "🥒",
    Water: "💧",
  };
  return map[category] ?? "🛒";
}

export default Hero;
