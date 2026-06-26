// redux/features/cart-api-slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cart } from "@/types/product";
import * as cartApi from "@/lib/api/cart";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cartApi/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.getCart();
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cartApi/add",
  async (payload: { _id: string; count: number; color?: string }, { rejectWithValue }) => {
    try {
      return await cartApi.addToCart({ cart: [payload] });
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to add to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cartApi/remove",
  async (productId: string, { rejectWithValue }) => {
    try {
      await cartApi.removeFromCart(productId);
      return productId;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to remove from cart");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cartApi/clear",
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to clear cart");
    }
  }
);

const cartApiSlice = createSlice({
  name: "cartApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      if (state.cart) {
        state.cart.products = state.cart.products.filter(
          (p) => p.product._id !== action.payload
        );
        state.cart.cartTotal = state.cart.products.reduce(
          (acc, p) => acc + p.price * p.count,
          0
        );
      }
    });

    builder.addCase(clearCart.fulfilled, (state) => {
      state.cart = null;
    });
  },
});

export default cartApiSlice.reducer;