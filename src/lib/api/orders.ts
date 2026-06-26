/**
 * lib/api/orders.ts
 */

import { api } from "./client";
import { Order, CheckoutRequest, PaginatedResponse } from "@/types/api";

// ─── Checkout ─────────────────────────────────────────────────────────────────

export async function checkout(payload: CheckoutRequest): Promise<Order> {
  return api.post<Order, CheckoutRequest>("/orders/checkout", payload);
}

// ─── Order List ───────────────────────────────────────────────────────────────

export async function getOrders(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Order>> {
  return api.get<PaginatedResponse<Order>>(
    `/orders?page=${page}&limit=${limit}`
  );
}

// ─── Single Order ─────────────────────────────────────────────────────────────

export async function getOrderById(orderId: string): Promise<Order> {
  return api.get<Order>(`/orders/${orderId}`);
}

export async function getOrderByNumber(orderNumber: string): Promise<Order> {
  return api.get<Order>(`/orders/number/${orderNumber}`);
}

// ─── Cancel ───────────────────────────────────────────────────────────────────

export async function cancelOrder(orderId: string): Promise<Order> {
  return api.post<Order>(`/orders/${orderId}/cancel`);
}

// ─── Tracking ─────────────────────────────────────────────────────────────────

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  events: { timestamp: string; description: string; location: string }[];
}

export async function getOrderTracking(orderId: string): Promise<TrackingInfo> {
  return api.get<TrackingInfo>(`/orders/${orderId}/tracking`);
}