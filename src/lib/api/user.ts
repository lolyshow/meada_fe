/**
 * lib/api/user.ts
 */

import { api } from "./client";
import { AuthUser, Address, UpdateProfileRequest } from "@/types/api";

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<AuthUser> {
  return api.get<AuthUser>("/user/profile");
}

export async function updateProfile(
  payload: UpdateProfileRequest
): Promise<AuthUser> {
  return api.patch<AuthUser, UpdateProfileRequest>("/user/profile", payload);
}

// ─── Addresses ───────────────────────────────────────────────────────────────

export async function getAddresses(): Promise<Address[]> {
  return api.get<Address[]>("/user/addresses");
}

export async function createAddress(
  payload: Omit<Address, "id">
): Promise<Address> {
  return api.post<Address, Omit<Address, "id">>("/user/addresses", payload);
}

export async function updateAddress(
  addressId: string,
  payload: Partial<Omit<Address, "id">>
): Promise<Address> {
  return api.patch<Address, Partial<Omit<Address, "id">>>(
    `/user/addresses/${addressId}`,
    payload
  );
}

export async function deleteAddress(addressId: string): Promise<void> {
  return api.delete(`/user/addresses/${addressId}`);
}

export async function setDefaultAddress(addressId: string): Promise<Address> {
  return api.patch<Address>(`/user/addresses/${addressId}/default`);
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

export async function getWishlist(): Promise<WishlistItem[]> {
  return api.get<WishlistItem[]>("/user/wishlist");
}

export async function addToWishlist(productId: string): Promise<WishlistItem> {
  return api.post<WishlistItem>("/user/wishlist", { productId });
}

export async function removeFromWishlist(productId: string): Promise<void> {
  return api.delete(`/user/wishlist/${productId}`);
}