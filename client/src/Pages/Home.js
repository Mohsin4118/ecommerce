import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import toast from 'react-hot-toast'
import Layout from '../Components/LayOuts/Layout'
import { useSelector } from 'react-redux';

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  // const [auth, setAuth] = useState()  
  
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`, 
    },
  });

  //Get All categories
  const getCategory = async ()=>{
    try {
      const {data} = await instance.get(`/api/v1/category/get-categories`)
      if(data?.success){
        setCategories(data?.category)
        // console.log(">>>>>>>>>>",category[0].name)
      }
    } catch (error) {
      console.log(">>>>>>>>>>>>>??????????",error)
      // toast.error('something went wrong in getting category')
    }
      }
    
      useEffect(()=>{
          getCategory();
            //eslint-disable-next-line
      },[])

//Get App products  
const getAllProducts = async () => {
try {
  const {data} = await instance.get(`/api/v1/products/get-product`)
  setProducts(data.product)
} catch (error) {
  console.log(error)
}
}

useEffect(()=>{
  getAllProducts()
  //eslint-disable-next-line
},[])
  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="p-6">
  <div className="flex flex-row gap-4">
    <div className="w-3/12 flex justify-center">
      <h1>Filter By Products</h1>
    </div>
    <div className="w-9/12 flex flex-col justify-center mx-auto text-center">
      <h3>All Products</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
              {products.map((p, index) => (
                <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div
                key={p._id}
                className='bg-white rounded-md p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-72 md:w-48 lg:w-72'
                style={{ minWidth: '15rem' }}
                >
                  <div className='flex items-center justify-center mb-3 h-24'>
                <img src={`/api/v1/products/product-photo/${p._id}`} alt='' className='h-full max-h-full '/>
                  </div>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Name: <span className='text-yellow-500'>{p.name}</span></p>
                </div>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Description: <span className='text-yellow-500'>{p.description}</span></p>
                </div>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Price: <span className='text-yellow-500'>{p.price}</span></p>
                </div>
                <div className='flex flex-row gap-2'>
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400  text-white font-bold'
                onClick={""}
                >
                <span className="font-medium">More Details</span>
                </button>
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-400  text-white font-bold'
                onClick={""}
                >
                <span className="font-medium">More Details</span>
                </button>
                </div>
                </div>
                </Link>
              ))}
            </div>
    </div>
  </div>
</div>
    </Layout>
  
)}

export default Home
