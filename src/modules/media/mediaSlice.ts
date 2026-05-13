import { createSlice } from '@reduxjs/toolkit';
import { fetchMedia, fetchMediaItem } from './mediaThunk';
import { MediaState } from './types';

const initialState: MediaState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearSelectedMedia(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load media';
      })
      .addCase(fetchMediaItem.pending, (state) => {
        state.loading = true;
        state.selectedItem = null;
        state.error = null;
      })
      .addCase(fetchMediaItem.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchMediaItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load media item';
      });
  },
});

export const { clearSelectedMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
