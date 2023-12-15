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
  
    updateUser: (state, action) => {
      const { name, email, phone, address } = action.payload;
      state.user = {
        ...state.user,
        name,
        email,
        phone,
        address,
      };
      localStorage.setItem('auth', JSON.stringify(state));
    },

  },
});

export const { setUser, clearUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
