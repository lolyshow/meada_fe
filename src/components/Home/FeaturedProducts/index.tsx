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

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    dispatch(
      fetchProducts({
        featured: true,
        limit: 8,
      })
    );
  }, [dispatch]);

  const featuredProducts = products?.products ?? [];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-green-600">
              MAELDA Picks
            </span>

            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Featured Products
            </h2>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Fresh picks handpicked for your kitchen.
            </p>
          </div>

          <Link
            href="/shop-without-sidebar"
            className="hidden text-sm font-semibold text-green-600 transition hover:text-green-700 sm:inline-flex"
          >
            View All Products →
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[320px] animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">
              Unable to load featured products.
            </p>
          </div>
        )}

        {/* Products */}
        {!isLoading && !error && featuredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {featuredProducts.map((product) => (
              <ProductItem
                key={product._id}
                item={product}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && featuredProducts.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 py-12 text-center">
            <p className="text-gray-500">
              No featured products available right now.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop-without-sidebar"
            className="inline-flex text-sm font-semibold text-green-600 transition hover:text-green-700"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
