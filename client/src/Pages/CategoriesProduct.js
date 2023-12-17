import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import Layout from '../Components/LayOuts/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CategoriesProduct = () => {
const authState = useSelector((state) => state.auth);
const params = useParams()
const navigate = useNavigate()
const [product, setProduct] = useState([])
const [category, setCategory] = useState([])

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `${authState.token}`, 
    },
    });

    useEffect(()=>{
        if(params?.slug) getProductsByCat()
    },[params?.slug])

const getProductsByCat = async () => {
try {
    console.log("In Api CAll")
    const {data} = await instance.get(`/api/v1/products/product-category/${params.slug}`)
    console.log(">>>>>>>>>>>>>",data)
    setProduct(data?.products)
    setCategory(data?.category)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>", product.name)
} catch (error) {
    console.log(error)
}
}

  return (
    <Layout title={`${params.slug}`}>
        <div className='container-fluid'>
        <div className='flex flex-col'>
        <p className='font-semibold text-xl text-center mt-5'>Category - {category.name}</p>
        <p className='text-center'>{product.length} Product found</p>
        <div className='grid md:grid-cols-4 sm:grid-cols-2'>
        {product && product.map((p, index) => (
                // <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div
                key={p._id}
                className='bg-white rounded-md mt-5 p-3 m-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-72 md:w-48 lg:w-72'
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
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400  text-white font-bold'
                onClick={()=>navigate(`/product/${p.slug}`)}
                >
                <span className="font-medium">More Details</span>
                </button>
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-400  text-white font-bold'
                onClick={()=> navigate('/cart')}
                >
                <span className="font-medium">Add To Cart</span>
                </button>
                </div>
                </div>
                // </Link>
              ))}
        </div>
        </div>
        </div>
        {/* {
            product.map((p)=>(
                <div>
            <p className='text-blue-500'>{p.name}</p>
                </div>
            ))
        } */}
    </Layout>
  )
}

export default CategoriesProduct