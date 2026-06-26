import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/types/api";
import * as authApi from "@/lib/api/auth";
import { utils } from "@/utils/constants";

// ─── State ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);

      if (data.status === 500) {
        return rejectWithValue({ message: "Server error, please try again later", code: 500 });
      }

      if (data.status !== 200) {
        return rejectWithValue({ message: data.message ?? "Login failed", code: data.status });
      }
      else if(data.status === 200) {
        localStorage.setItem(utils.tokenVar, data?.token);
      }
      return data;
    } catch (err: any) {
      return rejectWithValue({ message: err.message ?? "Login failed", code: 500 });
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { user } = await authApi.register(payload);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Registration failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getMe();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Manually set user (e.g. after profile update)
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── login ──────────────────────────────────────────────────────────────
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      // .addCase(login.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // });
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as { message: string; code: number };
        state.error = payload.message; // ✅ only store the string
      });

    // ── register ───────────────────────────────────────────────────────────
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // ── logout ─────────────────────────────────────────────────────────────
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // ── fetchMe ────────────────────────────────────────────────────────────
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;