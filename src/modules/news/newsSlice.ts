import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, fetchNewsItem } from './newsThunk';
import { NewsState } from './types';

const initialState: NewsState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearSelectedNews(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load news';
      })
      .addCase(fetchNewsItem.pending, (state) => {
        state.loading = true;
        state.selectedItem = null;
        state.error = null;
      })
      .addCase(fetchNewsItem.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchNewsItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load news item';
      });
  },
});

export const { clearSelectedNews } = newsSlice.actions;
export default newsSlice.reducer;
