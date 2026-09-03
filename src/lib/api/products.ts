// lib/api/products.ts

import { api } from "./client";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductPagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: ProductPagination;
}

export interface GetProductsParams {
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ShopProductsResponse {
  success: boolean;
  products: Product[];
  pagination: ProductPagination;
}

export interface ShopProductsParams {
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}


// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(
  params?: GetProductsParams
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.category) {
    searchParams.set("category", params.category);
  }

  if (params?.page) {
    searchParams.set("page", String(params.page));
  }

  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params?.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.minPrice !== undefined) {
    searchParams.set("minPrice", String(params.minPrice));
  }

  if (params?.maxPrice !== undefined) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }

  const query = searchParams.toString();

  return api.get<ProductsResponse>(
    query ? `/product?${query}` : "/product",
    { public: true }
  );
}


// ─── Single Product ───────────────────────────────────────────────────────────

export async function getProductById(
  id: string
): Promise<Product> {
  return api.get<Product>(
    `/product/${id}`,
    { public: true }
  );
}


// ─── Products By Category ─────────────────────────────────────────────────────

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await getProducts({
    category,
  });

  return response.products;
}


// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>(
    "/category",
    { public: true }
  );
}

export async function getShopProducts(
  params: ShopProductsParams = {}
): Promise<ShopProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.minPrice !== undefined) {
    searchParams.set("minPrice", String(params.minPrice));
  }

  if (params.maxPrice !== undefined) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }

  const query = searchParams.toString();

  return api.get<ShopProductsResponse>(
    query ? `/product?${query}` : "/product",
    { public: true }
  );
}