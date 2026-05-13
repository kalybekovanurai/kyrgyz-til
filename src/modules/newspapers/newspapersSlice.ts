import { createSlice } from '@reduxjs/toolkit';
import { fetchNewspapers } from './newspapersThunk';
import { NewspapersState } from './types';

const initialState: NewspapersState = {
  items: [],
  loading: false,
  error: null,
};

const newspapersSlice = createSlice({
  name: 'newspapers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewspapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewspapers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNewspapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load newspapers';
      });
  },
});

export default newspapersSlice.reducer;
