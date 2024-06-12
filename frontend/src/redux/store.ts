import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { taskApi } from './api/task';
import userSlice from './userSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    user: userSlice,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      taskApi.middleware,
    ),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
