// lib/api/products.ts

import { api } from "./client";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  return api.get<Product[]>("/product", { public: true });
}

export async function getProductById(id: string): Promise<Product> {
  return api.get<Product>(`/product/${id}`, { public: true });
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return api.get<Product[]>(`/product?category=${category}`, { public: true });
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>("/category", { public: true });
}