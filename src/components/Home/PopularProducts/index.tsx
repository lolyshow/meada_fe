"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";

import {
  useAppDispatch,
  useAppSelector,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "@/redux/store";

import { fetchProducts } from "@/redux/features/products-slice";

const PopularProducts = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    dispatch(
      fetchProducts({
        featured: true,
        limit: 8,
      }),
    );
  }, [dispatch]);

  const popularProducts = products?.products ?? [];

  return (
    <section className="bg-[#F7F8F4] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-[#7E9828]">
              Customer Favorites
            </span>

            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Popular Sellers
            </h2>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Loved by MAELDA customers and selling fast.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-[#7E9828] transition hover:text-[#61751F] sm:inline-flex"
          >
            Shop All Products →
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[320px] animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="rounded-xl border border-red-100 bg-white p-6 text-center">
            <p className="text-sm text-red-500">
              Unable to load popular products.
            </p>
          </div>
        )}

        {/* Products */}
        {!isLoading && !error && popularProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {popularProducts.map((product, index) => (
              <div key={product._id} className="relative">
                {/* Best Seller Badge */}
                {index < 3 && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[#AFC946] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Popular
                  </span>
                )}

                <ProductItem item={product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && popularProducts.length === 0 && (
          <div className="rounded-xl bg-white py-12 text-center">
            <p className="text-gray-500">
              Popular products will appear here once customers start shopping.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="text-sm font-semibold text-[#7E9828] transition hover:text-[#61751F]"
          >
            Shop All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
