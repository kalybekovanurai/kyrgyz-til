import { createSlice } from '@reduxjs/toolkit';
import { fetchLessonItem, fetchLessons } from './lessonsThunk';
import { LessonsState } from './types';

const initialState: LessonsState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    clearSelectedLesson(state) {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load lessons';
      })
      .addCase(fetchLessonItem.pending, (state) => {
        state.loading = true;
        state.selectedItem = null;
        state.error = null;
      })
      .addCase(fetchLessonItem.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchLessonItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load lesson';
      });
  },
});

export const { clearSelectedLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
