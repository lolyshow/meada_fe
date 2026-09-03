// redux/features/products-slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  ProductsResponse,
} from "@/lib/api/products";

interface ProductsState {
  items: ProductsResponse;
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

interface FetchProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams = {}, { rejectWithValue }) => {
    try {
      const response = await getProducts(params);

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
const initialState: ProductsState = {
  items: {
    success: false,
    products: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
      limit: 12,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  selectedProduct: null,
  isLoading: false,
  error: null,
};

// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getProducts();
//     } catch (err: any) {
//       return rejectWithValue(
//         err.message ?? "Failed to fetch products"
//       );
//     }
//   }
// );

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (err: any) {
      return rejectWithValue(
        err.message ?? "Failed to fetch product"
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      return await getProductsByCategory(category);
    } catch (err: any) {
      return rejectWithValue(
        err.message ?? "Failed to fetch products"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ─────────────────────────────────────────────
      // Fetch all products
      // ─────────────────────────────────────────────

      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─────────────────────────────────────────────
      // Fetch single product
      // ─────────────────────────────────────────────

      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ─────────────────────────────────────────────
      // Fetch products by category
      // ─────────────────────────────────────────────

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.items = {
          success: true,
          products: action.payload,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalProducts: action.payload.length,
            limit: action.payload.length,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;