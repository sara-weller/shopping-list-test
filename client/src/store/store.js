import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice';

// Configure the Redux store with categories and cart slices
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
  },
});

export default store;