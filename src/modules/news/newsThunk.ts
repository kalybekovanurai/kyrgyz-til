import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/src/lib/api';

export const fetchNews = createAsyncThunk('news/fetchAll', api.news);
export const fetchNewsItem = createAsyncThunk('news/fetchItem', api.newsItem);
