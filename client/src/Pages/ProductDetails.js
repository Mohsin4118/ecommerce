import React, {useEffect, useState} from 'react'
import Layout from '../Components/LayOuts/Layout'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const ProductDetails = () => {

  const authState = useSelector((state) => state.auth);
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [loading, setlaoding] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([ ])

  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`, 
    },
  });

  useEffect(()=>{
    if(params?.slug) getProduct()
  },[params?.slug])

  const getProduct = async () => {
    try {
      const {data} = await instance.get(`/api/v1/products/get-product/${params.slug}`)
      setProduct(data?.product)
      relatedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error)  
    }
  }

  //Get Related Prodicts
  const relatedProduct = async (pid, cid) => {
    try {
      setlaoding(true)
      const { data } = await instance.get(`/api/v1/products/related-product/${pid}/${cid}`);  
      setRelatedProducts(data?.product)
      setlaoding(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={"Product Details"}>
      <div className='container-fluid'>
      <div className='flex flex-col justify-center items-center'>
      </div>
      {product ? (
              <div className="grid grid-cols-2 gap-4">
                <div className='p-7 w-full'>
                <img
                  src={`/api/v1/products/product-photo/${product._id}`}
                  alt={product.name}
                  className="rounded-lg mb-4 shadow-md w-full shadow-md"
                />
                </div>
                <div className='p-7 flex items-center justify-center h-full'>
                  <div className='flex flex-col'>
                    <p className='mt-3 font-bold text-xl'>Product Details</p>
                  <h4 className='text-lg'>Name: <span className='font-semibold'>{product.name}</span></h4>
                  <h4 className='text-lg'>Description: <span className='font-semibold'>{product.description}</span></h4>
                  <h4 className='text-lg'>Price: $ <span className='font-semibold font-'>{product.price}</span></h4>
                  <h4 className='text-lg'>Category: <span className='font-semibold'>{product?.category?.name}</span></h4>
                  <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-400  text-white font-bold'
                  onClick={()=> navigate('/cart')}
                  >
                <span className="font-medium">Add To Cart</span>
                </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center p-10'>
              <p>No product details found</p>
              </div>
                )}
                <hr/>
                <div className='flex flex-col'>
                  <p className='font-semibold text-blue-500 text-2xl ml-4 mt-4'>Similar Products</p>
                  {relatedProducts.length < 1 && (
                    <div className='text-center'><p>No product Found</p></div>
                  )}
                  <div className='grid grid-cols-3'>
                  {loading? ("loading..."): relatedProducts?.map((p, index) => (
                // <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div className='flex justify-center items-center p-4'>
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
                <p>Description: <span className='text-yellow-500'>{p.description.substring(0,30)}</span></p>
                </div>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Price: <span className='text-yellow-500'>$ {p.price}</span></p>
                </div>
                <div className='flex flex-row gap-2'>
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-400  text-white font-bold'
                onClick={()=> navigate('/cart')}
                >
                <span className="font-medium">Add To Cart</span>
                </button>
                </div>
                </div>
                </div>
                // </Link>
              ))}
                  </div>
                </div>
      </div>
    
    </Layout>
  )
}