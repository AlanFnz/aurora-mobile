import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/authSlice';
import foldersReducer from '@store/foldersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    folders: foldersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
