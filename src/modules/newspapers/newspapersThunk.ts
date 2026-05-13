import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/src/lib/api';

export const fetchNewspapers = createAsyncThunk('newspapers/fetchAll', api.newspapers);
