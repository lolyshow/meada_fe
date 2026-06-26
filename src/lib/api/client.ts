import { ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001/api";

let accessToken: string | null = null;

export const tokenStore = {
  get: () => accessToken,
  set: (token: string) => { accessToken = token; },
  clear: () => { accessToken = null; },
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<B = unknown> {
  method?: HttpMethod;
  body?: B;
  public?: boolean;
  headers?: Record<string, string>;
  next?: NextFetchRequestConfig;
}

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers = {}, next } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (!options.public && accessToken) {
    requestHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  const init: RequestInit = {
    method,
    headers: requestHeaders,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...(next ? { next } : {}),
  };

  let response = await fetch(`${BASE_URL}${path}`, init);

  // ── Silent token refresh on real 401 HTTP status ──────────────────────────
  if (response.status === 401 && !options.public) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`;
      response = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: requestHeaders,
      });
    } else {
      tokenStore.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  // ── 204 No Content ────────────────────────────────────────────────────────
  if (response.status === 204) {
    return undefined as TResponse;
  }

  // ── Parse JSON once ───────────────────────────────────────────────────────
  const json = await response.json();

  // ── Check body status (your API uses 200 HTTP but puts errors in body) ────
  if (json?.status && json.status !== 200) {
    throw {
      message: json.message ?? "Something went wrong",
      status: json.status,
      code: json.code ?? "ERROR",
    } as ApiError;
  }

  // ── Also catch real HTTP errors (4xx, 5xx) ────────────────────────────────
  if (!response.ok) {
    throw {
      message: json?.message ?? response.statusText ?? "Something went wrong",
      status: json?.status ?? response.status,
      code: json?.code ?? "ERROR",
    } as ApiError;
  }

  return json as TResponse;
}

// ─── Token Refresh ────────────────────────────────────────────────────────────

let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return false;

        const res = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) return false;

        const data = await res.json();
        tokenStore.set(data.accessToken);
        storeRefreshToken(data.refreshToken);
        return true;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("refresh_token");
}

export function storeRefreshToken(token: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("refresh_token", token);
  }
}

export function clearRefreshToken() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("refresh_token");
  }
}

export const api = {
  get: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "GET" }),

  post: <T, B = unknown>(path: string, body?: B, opts?: Omit<RequestOptions<B>, "method" | "body">) =>
    apiRequest<T, B>(path, { ...opts, method: "POST", body }),

  put: <T, B = unknown>(path: string, body?: B, opts?: Omit<RequestOptions<B>, "method" | "body">) =>
    apiRequest<T, B>(path, { ...opts, method: "PUT", body }),

  patch: <T, B = unknown>(path: string, body?: B, opts?: Omit<RequestOptions<B>, "method" | "body">) =>
    apiRequest<T, B>(path, { ...opts, method: "PATCH", body }),

  delete: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...opts, method: "DELETE" }),
};