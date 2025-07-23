import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch categories and products from the server
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:5000/api/categories'); // Change URL if needed
    return await response.json();
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;