import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAdmin, validateAdminToken } from './auth';

export const adminLogin = createAsyncThunk('auth/adminLogin', loginAdmin);
export const checkAdminSession = createAsyncThunk('auth/checkAdminSession', validateAdminToken);
