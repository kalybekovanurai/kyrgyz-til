import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/src/lib/api';

export const fetchLessons = createAsyncThunk('lessons/fetchAll', api.lessons);
export const fetchLessonItem = createAsyncThunk('lessons/fetchItem', api.lessonItem);
