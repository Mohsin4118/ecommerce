import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: "",
  results: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,

  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setKeyword, setResults } = searchSlice.actions;
export default searchSlice.reducer;
