import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: '',
};

const storedData = localStorage.getItem('auth');
const initialUserData = storedData ? JSON.parse(storedData) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserData || initialState,
  // initialState: {
  //   user: null,
  //   token: '',
  // },
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      // Update localStorage whenever state changes
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    },
    clearUser: (state) => {
      state.user = null;
      state.token = '';
      // Clear user data from local storage
      localStorage.removeItem('auth');
    },
  
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
