// types/product.ts

export interface ProductImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  sold: number;
  images: ProductImage[];
  totalrating: string;
  ratings: any[];
  createdAt: string;
  updatedAt: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartProduct {
  product: Product;
  count: number;
  price: number;
  _id: string;
}

export interface Cart {
  _id: string;
  products: CartProduct[];
  cartTotal: number;
  orderby: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface ShopProductsResponse {
  success: boolean;
  products: Product[];
  pagination: ProductPagination;
}

