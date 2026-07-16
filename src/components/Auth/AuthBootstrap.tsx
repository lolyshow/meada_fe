"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector, selectIsAuthenticated } from "@/redux/store";
import { fetchMe } from "@/store/authSlice";
import { fetchCart } from "@/redux/features/cart-api-slice";
import { tokenStore } from "@/lib/api/client";

const AuthBootstrap = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // ── Step 1: On mount, restore token from localStorage then fetch user ──────
  useEffect(() => {
    const stored = localStorage.getItem("access_token");
    
    if (stored) {
      console.log("storedFound!!!!", stored)
      tokenStore.set(stored); // restore token into memory
      dispatch(fetchMe());    // verify token is still valid + populate user state
    }
  }, []);

  // ── Step 2: Once auth is confirmed, fetch the cart ────────────────────────
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated]);

  return null; // renders nothing, just bootstraps state
};

export default AuthBootstrap;
