import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setKeyword, setResults } from '../../store/searchSlice';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const SearchInput = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Make sure this is used later if needed
    const keyword = useSelector((state) => state.search.keyword);
    const authState = useSelector((state) => state.auth);

  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`, 
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.get(`/api/v1/products/search/${keyword}`);
      console.log(data)
      dispatch(setResults(data));
      navigate("/search")
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    dispatch(setKeyword(e.target.value));
    console.log(e.target.value)
  };

  return (
    <form onSubmit={handleSubmit}>   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input  
          type="search"
          id="default-search"
          name="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Search products..."
          required
        />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
      </div>
    </form>
  );
};

export default SearchInput;
