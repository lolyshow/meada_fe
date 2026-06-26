/**
 * lib/hooks/useCart.ts
 *
 * Uses SWR for caching + optimistic updates.
 * Install: npm install swr
 */

import useSWR, { mutate } from "swr";
import * as cartApi from "@/lib/api/cart";
import { Cart, AddToCartRequest } from "@/types/api";

const CART_KEY = "/cart";

export function useCart() {
  const { data, error, isLoading } = useSWR<Cart>(CART_KEY, cartApi.getCart, {
    // Keep cart fresh — revalidate on focus & reconnect
    revalidateOnFocus: true,
  });

  const addItem = async (payload: AddToCartRequest) => {
    const updated = await cartApi.addToCart(payload);
    mutate(CART_KEY, updated, false); // update cache without revalidating
    return updated;
  };

  const updateItem = async (itemId: string, quantity: number) => {
    const updated = await cartApi.updateCartItem(itemId, { quantity });
    mutate(CART_KEY, updated, false);
    return updated;
  };

  const removeItem = async (itemId: string) => {
    const updated = await cartApi.removeCartItem(itemId);
    mutate(CART_KEY, updated, false);
    return updated;
  };

  const applyCoupon = async (code: string) => {
    const updated = await cartApi.applyCoupon(code);
    mutate(CART_KEY, updated, false);
    return updated;
  };

  const removeCoupon = async () => {
    const updated = await cartApi.removeCoupon();
    mutate(CART_KEY, updated, false);
    return updated;
  };

  return {
    cart: data,
    isLoading,
    isError: !!error,
    itemCount: data?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
    addItem,
    updateItem,
    removeItem,
    applyCoupon,
    removeCoupon,
  };
}