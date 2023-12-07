import React, {useState, useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Layout from '../../Components/LayOuts/Layout'
import AdminMenu from '../../Components/LayOuts/AdminMenu'
import { Select } from 'antd';
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'
const {Option} = Select

const CreateProduct = () => {
const navigate = useNavigate()
const [categories, setCategories] = useState([])
const [category, setCategory] = useState([])
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [price, setPrice] = useState("")
const [quantity, setQuantity] = useState("")
const [shipping, setShipping] = useState("")
const [photo, setPhoto] = useState("")
const authState = useSelector((state) => state.auth);

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `${authState.token}`, 
  },
});

const getCategories = async ()=>{
  try {
    const {data} = await instance.get(`/api/v1/category/get-categories`)
    if(data?.success){
      setCategories(data?.category)

      console.log(">>>>>>>>>>",data.category[0].name)
    }
  } catch (error) {
    console.log(">>>>>>>>>>>>>??????????",error)
    toast.error('something went wrong in getting category')
  }
    }

    useEffect(()=>{
      getCategories();
    },[])
// Create Product Function
    const handleSubmit = async (e)=>{
      console.log("in handle submit")
      e.preventDefault()
      try {
        const productData = new FormData
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("shipping", shipping)
        productData.append("photo", photo)
        productData.append("category", category)
        productData.append("quantity", quantity)

         // Log the FormData values
    for (let pair of productData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
        const { data } = await instance.post(`/api/v1/products/create-product`, productData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // if(data){
        //   console.log(data)
        // }

        if(data?.success){
          console.log(data?.message)
          toast.success("Product created successfully")
          navigate("/dashboard/admin/products")
        }
      } catch (error) {
        console.log(error,"s>>>>>>>>>>>>>>>>>>>>>>>>>")
        toast.error("Error in creating Product")
      }
    }
    
  return (
    <Layout title={"Dashbaord - Create Product"}>
    <div className='container-fluid p-2'>
      <div className="flex flex-row gap-2">
      <div className="">
      <AdminMenu/>
      </div>
      <div className='mb-4 flex flex-col w-full text-center'>
     <h1 className='font-500 text-4xl text-gray-900'>Create Product</h1>
    <div className='py-3 flex flex-col justify-center'>
    <div className='flex justify-center'>
    <Select bordered={true}
     placeholder="Select a Category"
     size='large'
     showSearch
     style={{ width: '500px' }}
     onChange={(value)=>{setCategory(value)}}
     >
      {categories?.map(c=> (
        <Option key={c._id} value={c._id}>
          {c.name}
        </Option>
      ))}
        
    </Select>
    </div>
    <div className='mt-3 flex justify-center'>
  <label htmlFor='uploadImage' className='w-48 border border-yellow-300 text-yellow-300 h-8 hover:bg-yellow-400 hover:text-white rounded-md cursor-pointer inline-flex items-center justify-center text-sm font-semibold'>
    {photo ? photo.name : "Upload Photo"}
    <input type='file' id='uploadImage' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} className='hidden' />
  </label>
</div>
<div className='mb-3 flex justify-center'>
{photo && (
  <div className='mb-3 pt-6'>
    <img src={URL.createObjectURL(photo)} alt='product_photo' className='h-48 rounded rounded-lg'/>
  </div>
)}
</div>
<div className='mb-3'>
  <input className='h-8 w-[500px] rounded-lg p-1 pl-3 text-sm border border-gray-300 placeholder-gray-300'
    type='text' value={name}
    placeholder='write a name'
    onChange={(e)=> setName(e.target.value)}/>
</div>
<div className='mb-3'>
  <TextArea className='w-[500px] placeholder-gray-300' type='text' value={description} placeholder='write a description' onChange={(e)=> setDescription(e.target.value)}/>
</div>
<div className='mb-3'>
  <input className='h-8 w-[500px] rounded-lg p-1 pl-3 text-sm border border-gray-300 placeholder-gray-300' type='number' value={price} placeholder='price' onChange={(e)=> setPrice(e.target.value)}/>
</div>
<div className='mb-3'>
  <input className='h-8 w-[500px] rounded-lg p-1 pl-3 text-sm border border-gray-300 placeholder-gray-300' type='text' value={quantity} placeholder='enter quantity' onChange={(e)=> setQuantity(e.target.value)}/>
</div>
<div className='mb-3'>
<Select 
bordered={true}
placeholder="Select Shipping"
size='large'
showSearch
style={{ width: '500px' }}
onChange={(value)=>{
  setShipping(value)
}}
>
  <Option value="0">No</Option>
  <Option value="1">Yes</Option>
</Select>
</div>
<div className=''>
<button className='font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-400 w-[500px] text-white font-bold'
onClick={handleSubmit}
>
<span className="font-medium">CREATE PRODUCT</span>
</button>
</div>
  </div>
   </div>
    </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
