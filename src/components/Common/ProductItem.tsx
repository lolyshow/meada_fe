"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { addToCart } from "@/redux/features/cart-api-slice";
import { useAppDispatch } from "@/redux/store";

interface ProductItemProps {
  item: Product;
}

const ProductItem = ({ item }: ProductItemProps) => {
  const { openModal } = useModalContext();
  const dispatch = useAppDispatch();

  const productImage =
    item.images?.length > 0
      ? item.images[0].url
      : "/images/products/product-1-bg-1.png";

  const isOutOfStock = item.quantity <= 0;
  const isLowStock = item.quantity > 0 && item.quantity <= 3;

  // ─────────────────────────────────────────────────────────────────────────
  // Quick View
  // ─────────────────────────────────────────────────────────────────────────

  const handleQuickView = () => {
    dispatch(updateQuickView({ ...item }));
    openModal();
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Add To Cart
  // ─────────────────────────────────────────────────────────────────────────

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    const result = await dispatch(
      addToCart({
        _id: item._id,
        count: 1,
      })
    );

    if (addToCart.fulfilled.match(result)) {
      toast.success(`${item.title} added to cart!`);
    } else {
      toast.error("Please login to add items to your cart.");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Wishlist
  // ─────────────────────────────────────────────────────────────────────────

  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        id: item._id,
        discountedPrice: item.price,
        status: "available",
        quantity: 1,
      })
    );

    toast.success(`${item.title} added to wishlist!`);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Product Details
  // ─────────────────────────────────────────────────────────────────────────

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <article className="group">

      {/* ────────────────────────────────────────────────────────────────────
          Product Image
      ──────────────────────────────────────────────────────────────────── */}

      <div className="relative mb-4 overflow-hidden rounded-xl border border-gray-100 bg-[#F7F8F4]">

        {/* Product Image */}
        <Link
          href={`/shop-details/${item._id}`}
          onClick={handleProductDetails}
          className="block"
        >
          <div className="relative aspect-square w-full">
            <Image
              src={productImage}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Low Stock Badge */}
        {isLowStock && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-red-500 shadow-sm">
            Only {item.quantity} left
          </span>
        )}

        {/* Out Of Stock Badge */}
        {isOutOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            Out of stock
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-[#AFC946] hover:text-white"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Desktop Hover Actions */}
        {!isOutOfStock && (
          <div className="absolute bottom-3 left-0 hidden w-full justify-center gap-2 px-3 sm:flex">

            {/* Quick View */}
            <button
              type="button"
              onClick={handleQuickView}
              aria-label="Quick view"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-[#AFC946] hover:text-white"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-[#AFC946] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#96AE32]"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          Product Information
      ──────────────────────────────────────────────────────────────────── */}

      <div className="px-0.5">

        {/* Rating */}
        <div className="mb-1.5 flex items-center gap-2">

          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="#F5B942"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.5l2.93 5.94 6.56.95-4.75 4.63 1.12 6.54L12 17.47l-5.86 3.09 1.12-6.54-4.75-4.63 6.56-.95L12 2.5Z" />
              </svg>
            ))}
          </div>

          <span className="text-xs text-gray-400">
            ({item.totalrating || "0"})
          </span>
        </div>

        {/* Product Title */}
        <Link
          href={`/shop-details/${item._id}`}
          onClick={handleProductDetails}
          className="block"
        >
          <h3 className="line-clamp-2 min-h-[42px] text-sm font-semibold leading-5 text-gray-900 transition group-hover:text-[#7E9828] md:text-[15px]">
            {item.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between gap-2">

          <span className="text-base font-bold text-gray-900 md:text-lg">
            ₦{item.price.toLocaleString()}
          </span>

          {/* Mobile Add To Cart */}
          {!isOutOfStock && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-[#AFC946] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#96AE32] sm:hidden"
            >
              Add
            </button>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock && (
          <p className="mt-1 text-xs font-medium text-red-500">
            Currently unavailable
          </p>
        )}

        {isLowStock && (
          <p className="mt-1 text-xs text-gray-400">
            Hurry, only {item.quantity} remaining
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductItem;
