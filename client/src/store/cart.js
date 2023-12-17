import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [], // Get items from localStorage or initialize as an empty array
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      state.items = [...state.items, newItem]; // Create a new array by spreading existing items and adding the new item
      localStorage.setItem('cart', JSON.stringify(state.items)); // Save the updated cart to localStorage
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = []; // Reset items to an empty array
      localStorage.removeItem('cart'); // Remove 'cart' key from localStorage
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
