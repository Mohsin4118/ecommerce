import React, {useState} from 'react'
import logo from '../../assets/logo_transparent.png'
import { NavLink } from 'react-router-dom'
import {clearUser} from '../../store/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useCategory } from '../../hooks/useCategory';
import { Badge, Space } from 'antd'

const Header = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categories = useCategory()
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const handleLogOut = () => {
    dispatch(clearUser());
    toast.success("Logout Successfully")
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
  }

  return (
    <>  
<nav className="bg-[#ECF8F9] border-gray-200 dark:bg-gray-900 h-20 relative">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ABSO;">
  <div className="flex items-center">
      <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
  </div>
  <div className="flex md:order-2">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span className="sr-only">Search</span>
    </button>
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue" placeholder="Search..."/>
    </div>
    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      <div className="relative mt-3 md:hidden">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
      </div>
      <ul className="flex flex-col p-4 md:p-0 mt-4 md:mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
        <li>
          <NavLink to="/" className="block py-2 pl-3 pr-4 text-white font-bold hover:border-b border-black border-solid bg-blue-700  md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-blue-500" >Home</NavLink>
        </li>
        <li>
        <div className="relative">
        <button
          id="dropdownNavbarLink"
          onClick={toggleCategoryDropdown}
          className="flex items-center justify-between w-full py-2 px-3 hover:border-b border-black text-gray-600 uppercase hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-600 md:p-0 md:w-auto"
        >
          Categories
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        {isCategoryDropdownOpen && (
          
          <div
            id="dropdownNavbar"
            className="z-10 font-normal bg-white divide-gray-100 rounded-lg shadow absolute top-full left-0 mt-2 w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
            <li>
                <NavLink to={`/categories`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  All Categories
                </NavLink>
              </li>
              {categories.map((c, index)=>(
              <li>
                <NavLink to={`/categories/${c.slug}`} key={c._id} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {c.name}
                </NavLink>
              </li>
              ))}
              </ul>
          </div>
        )}
        </div>
        </li>
        {/* <li>
          <NavLink to="/pageNotFount" className="block py-2 pl-3 pr-4 text-white hover:border-b border-black border-solid bg-blue-700 md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-blue-500">Category</NavLink>
        </li> */}
        {
          !authState.user ? (
            <>
            <li>
          <NavLink to="/register" className="block py-2 pl-3 pr-4 text-white hover:border-b border-black border-solid bg-blue-700 md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-blue-500">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="block py-2 pl-3 pr-4 text-white hover:border-b border-black border-solidborder-b border-black border-solid bg-blue-7 md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-blue-500">Login</NavLink>
        </li></>
          ) : (
            <>
             <li>
             <div className="relative">
        <button
          id="dropdownNavbarLink"
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full py-2 px-3 hover:border-b border-black text-gray-600 uppercase hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-600 md:p-0 md:w-auto"
        >
          {authState?.user.name}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdownNavbar"
            className="z-10 font-normal bg-white divide-gray-100 rounded-lg shadow absolute top-full left-0 mt-2 w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
              <li>
                <NavLink to={`/dashboard/${authState.user.role === 1 ? "admin" : "user"}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Dashboard
                </NavLink>
              </li>
              <li>
          <NavLink to="/login" onClick={handleLogOut} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</NavLink>
            </li>
              </ul>
          </div>
        )}
        </div>
      </li>
            
            </>
          )
        }
        <li>
        <Space size="large">
        <Badge count={cartItems.length} offset={[10, -6]} showZero>
          <NavLink to="/cart" className="block py-2 pl-3 pr-4 text-white hover:border-b border-black border-solid bg-blue-700  md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-blue-500">Cart</NavLink>
        </Badge>
        </Space>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
