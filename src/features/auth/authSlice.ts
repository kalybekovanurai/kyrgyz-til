import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, checkAdminSession } from './authThunk';
import { AuthState } from './types';

const storedToken = localStorage.getItem('adminToken') || '';

const initialState: AuthState = {
  token: storedToken,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.token = '';
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('adminToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('adminToken', action.payload.token);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(checkAdminSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAdminSession.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAdminSession.rejected, (state) => {
        state.loading = false;
        state.token = '';
        state.isAuthenticated = false;
        state.error = 'Admin session expired';
        localStorage.removeItem('adminToken');
      });
  },
});

export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
