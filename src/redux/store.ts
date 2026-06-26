import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import authReducer from "@/store/authSlice";
import productsReducer from "./features/products-slice";
import cartApiReducer from "./features/cart-api-slice";


export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
    auth: authReducer, // 👈 added


    // quickViewReducer,
    // cartReducer,
    // wishlistReducer,
    // productDetailsReducer,
    products: productsReducer,   // ← API products
    cartApi: cartApiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ─── Auth Selectors ────────────────────────────────────────────────────────────────
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;


 
// ─── Products Selectors ───────────────────────────────────────────────────────
export const selectProducts = (state: RootState) => state.products.items;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductsLoading = (state: RootState) => state.products.isLoading;
export const selectProductsError = (state: RootState) => state.products.error;
 
// ─── Cart Selectors ───────────────────────────────────────────────────────────
export const selectCart = (state: RootState) => state.cartApi.cart;
export const selectCartItems = (state: RootState) => state.cartApi.cart?.products ?? [];
export const selectCartTotal = (state: RootState) => state.cartApi.cart?.cartTotal ?? 0;
export const selectCartItemCount = (state: RootState) =>
  state.cartApi.cart?.products.reduce((acc, p) => acc + p.count, 0) ?? 0;
export const selectCartLoading = (state: RootState) => state.cartApi.isLoading;
