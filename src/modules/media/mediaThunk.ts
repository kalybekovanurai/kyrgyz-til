import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/src/lib/api';

export const fetchMedia = createAsyncThunk('media/fetchAll', api.media);
export const fetchMediaItem = createAsyncThunk('media/fetchItem', api.mediaItem);
