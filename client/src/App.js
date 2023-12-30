import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNotFount from './Pages/PageNotFount';
import Register from './Pages/Auth/Register';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Auth/Login';
import DashBoard from './Pages/User/DashBoard';
import PrivateRoute from './Components/Routes/Private';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Orders from './Pages/User/Orders';
import Profile from './Pages/User/Profile';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/search';
import { ProductDetails } from './Pages/ProductDetails';
import { Categories } from './Pages/Categories';
import CategoriesProduct from './Pages/CategoriesProduct';
import { Cartpage } from './Pages/Cartpage';
import AdminOrders from './Pages/Admin/AdminOrders';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<Cartpage/>}/>
      <Route path='/categories/:slug' element={<CategoriesProduct/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='*' element={<PageNotFount/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route  path='/dashboard' element={<PrivateRoute/>} >
        <Route path='user' element={<DashBoard/>}/>
        <Route path='user/orders' element={<Orders/>}/>
        <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route  path='/dashboard' element={<AdminRoute/>} >
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/orders' element={<AdminOrders/>}/>
      </Route>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
    </Routes>
    </>
  );
}

export default App;
