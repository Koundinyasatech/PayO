import { configureStore } from '@reduxjs/toolkit';
import depositReducer from './features/depositSlice';

export const store = configureStore({
  reducer: {
    deposit: depositReducer,
    // Add other feature slices here (e.g., auth, wallet) as your app grows
  },
  // Automatically includes redux-thunk middleware by default
});