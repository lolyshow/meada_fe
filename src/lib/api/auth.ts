/**
 * lib/api/auth.ts
 */

import { api, tokenStore, storeRefreshToken, clearRefreshToken } from "./client";
import { LoginRequest, LoginResponse, AuthUser } from "@/types/api";

// ─── Login ────────────────────────────────────────────────────────────────────

// export async function login(credentials: LoginRequest): Promise<LoginResponse> {
//   const data = await api.post<LoginResponse, LoginRequest>(
//     "/auth/login",
//     credentials,
//     { public: true }
//   );
//   if(data?.status === 200) {

//     // Store tokens
//     tokenStore.set(data.tokens.accessToken);
//     storeRefreshToken(data.tokens.refreshToken);
//   }
//   return data;
// }

export async function login(credentials: LoginRequest) {
  return api.post<any, LoginRequest>("/auth/login", credentials, { public: true });
}

// ─── Register ─────────────────────────────────────────────────────────────────

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function register(payload: RegisterRequest): Promise<LoginResponse> {
  const data = await api.post<LoginResponse, RegisterRequest>(
    "/auth/register",
    payload,
    { public: true }
  );

  tokenStore.set(data.tokens.accessToken);
  storeRefreshToken(data.tokens.refreshToken);

  return data;
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  try {
    // Tell the server to invalidate the refresh token
    await api.post("/auth/logout");
  } finally {
    // Always clear local state, even if the server call fails
    tokenStore.clear();
    clearRefreshToken();
  }
}

// ─── Get Current User ─────────────────────────────────────────────────────────

export async function getMe(): Promise<AuthUser> {
  return api.get<AuthUser>("/auth/me");
}

// ─── Password ─────────────────────────────────────────────────────────────────

export async function requestPasswordReset(email: string): Promise<void> {
  return api.post("/auth/password/reset-request", { email }, { public: true });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  return api.post("/auth/password/reset", { token, password }, { public: true });
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  return api.post("/auth/password/change", { currentPassword, newPassword });
}