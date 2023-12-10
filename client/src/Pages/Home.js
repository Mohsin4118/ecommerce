import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Checkbox, Radio} from 'antd'
import { Link } from 'react-router-dom'
import Layout from '../Components/LayOuts/Layout'
import { useSelector } from 'react-redux';
import { Prices } from '../Components/Prices'
import SearchInput from '../Components/Form/SearchInput'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const authState = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()  
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
          getTotal()
        },[])

//Get All products  
const getAllProducts = async () => {
  try {
    setLoading(true);
    const { data } = await instance.get(`/api/v1/products/product-list/${page}`);
    setLoading(false);
    // When the page is 1, replace products; otherwise, append to existing products
    setProducts(page === 1 ? data?.products : [...products, ...data?.products]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  //get Total Count
  const getTotal = async ()=>{
    try {
      const {data} = await instance.get(`/api/v1/products/product-count`)
      setTotal(data?.total)
      console.log("LLLLLLLLLLLL", data.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
if(page === 1) return
loadMore() 
  },[page])

  //load more
  const loadMore = async ()=>{
    try {
      setLoading(true)
      const {data} = await instance.get(`/api/v1/products/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)

    }
  }

//filter by category
const handleFilter = (value, id)=> {
let all = [...checked]
if(value){
  all.push(id)
}else{
  all = all.filter(c => c!== id)
}
setChecked(all)
}
// useEffect(() => {
//   if (!checked.length || !radio.length) {
//     getAllProducts();
//   }
// }, [checked, radio]);

// useEffect(()=>{
//   if(checked.length || radio.length) getFilterProduct()
//   //eslint-disable-next-line
// },[checked, radio])

useEffect(() => {
  if (checked.length || radio.length) {
    getFilterProduct();
  } else {
    getAllProducts();
  }
}, [checked, radio]);


// filter product function
const getFilterProduct = async()=>{
  try {
   const {data} = await instance.post(`/api/v1/products/filter-product`, {checked, radio})
   console.log("><<<<<<<<<<<<<",data)
   if(data?.success){
    setProducts(data?.products)
   }
   console.log(">>>>>>>>>>product",data.products)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="p-6">
  <div className="flex flex-row gap-4">
    <div className="w-3/12 flex flex-col">
      <h1>Filter By Categories</h1>
      <div className='flex flex-col p-2'>
        {categories.map((c)=>(
          <Checkbox className='pb-3' key={c._id} onChange = {(e)=> handleFilter(e.target.checked, c._id)}>
            {c.name}
          </Checkbox>
        ))}
      </div>
      <h1>Filter By Price</h1>  
      <div className='flex flex-col p-2'>
        <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
          {Prices.map((p) => (
            <div className='mb-2' key={p._id} >
            <Radio value={p.array}>{p.name}</Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
      <div className='flex'> 
      <button className='bg-gray-200 p-2 rounded rounded-md text-blue-600' onClick={()=> window.location.reload()}>Reset filter</button>
      </div>
    </div>
    <div className="w-9/12 flex flex-col justify-center mx-auto text-center">
      {JSON.stringify(radio, null, 4)}
      <h3>All Products</h3>
      <SearchInput/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
              {products && products.map((p, index) => (
                // <Link to={`/dashboard/admin/product/${p.slug}`}>
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
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400  text-white font-bold'
                onClick={()=>navigate(`/product/${p.slug}`)}
                >
                <span className="font-medium">More Details</span>
                </button>
                <button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-400  text-white font-bold'
                onClick={""}
                >
                <span className="font-medium">Add To Cart</span>
                </button>
                </div>
                </div>
                // </Link>
              ))}
            </div>
            <div className='mt-6'>
            {
              products && products.length < total &&(
              <button className='bg-red-400 text-white p-3 rounded rounded-md' onClick={(e)=>{
                e.preventDefault()
                setPage(page + 1)
              }}>{loading ?"loading...." : "loadmore"}</button>
              )
            }
            </div>
      </div>
  </div>
</div>
    </Layout>
  
)}

export default Home
