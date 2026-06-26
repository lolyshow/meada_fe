// lib/api/cart.ts

import { api } from "./client";
import { Cart } from "@/types/product";

// ─── Get Cart ─────────────────────────────────────────────────────────────────

export async function getCart(): Promise<Cart> {
  return api.get<Cart>("/cart");
}

// ─── Add to Cart ──────────────────────────────────────────────────────────────

export interface AddToCartRequest {
  cart: { _id: string; count: number; color?: string }[];
}

export async function addToCart(payload: AddToCartRequest): Promise<Cart> {
  return api.post<Cart, AddToCartRequest>("/cart", payload);
}

// ─── Remove Item ──────────────────────────────────────────────────────────────

export async function removeFromCart(productId: string): Promise<any> {
  return api.delete(`/cart/${productId}`);
}

// ─── Clear Cart ───────────────────────────────────────────────────────────────

export async function clearCart(): Promise<any> {
  return api.delete("/cart/empty-cart");
}

// ─── Update Quantity ──────────────────────────────────────────────────────────

export async function updateCartQuantity(
  productId: string,
  count: number
): Promise<Cart> {
  return api.put<Cart>(`/cart/${productId}`, { count });
}