import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from '@/src/modules/media/mediaSlice';
import newsReducer from '@/src/modules/news/newsSlice';
import newspapersReducer from '@/src/modules/newspapers/newspapersSlice';
import lessonsReducer from '@/src/modules/lessons/lessonsSlice';
import authReducer from '@/src/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    newspapers: newspapersReducer,
    media: mediaReducer,
    lessons: lessonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
