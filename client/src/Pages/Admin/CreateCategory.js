import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../Components/LayOuts/Layout'
import AdminMenu from '../../Components/LayOuts/AdminMenu'
import CategoryForm from '../../Components/Form/CategoryForm'
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux'
import {Modal} from 'antd'

const CreateCategory = () => {
  const [category, setCategory] = useState([])
  const [name, setName] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const authState = useSelector((state) => state.auth);

  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`, 
    },
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen)
  };

  const handleSubmit = async (e)=>{ 
    e.preventDefault();
    const {data} = await instance.post("/api/v1/category/create-category", {name})
    if(data.success){
        toast.success(`${data.category.name} is created successfully`)
        getCategory();
        setName('');
    }else{
        toast.error(data.message)
    }
    try {
        
    } catch (error) {
        console.log(error)
        toast.error("something went wrong in input from")
    }
  }

  //Get All Category
const getCategory = async ()=>{
try {
  const {data} = await instance.get(`/api/v1/category/get-categories`)
  if(data?.success){
    setCategory(data?.category)
    // console.log(">>>>>>>>>>",category[0].name)
  }
} catch (error) {
  console.log(">>>>>>>>>>>>>??????????",error)
  toast.error('something went wrong in getting category')
}
  }

  useEffect(()=>{
      getCategory();
    //   console.log(">><<<<<",category)
  },[])

  //Update the category
  const handleUpdate =async (e)=>{
    e.preventDefault()
    try {
        const {data} = await instance.put(`/api/v1/category/update-category/${selected._id}`, {name: updateName})
        if(data.success){
            console.log(data.updateCategory.name)
            toast.success( `${data.updateCategory.name} is Updated successfully`)
            setSelected(null)
            setUpdateName("")
            setIsModalOpen(false)
            getCategory()
        }
    } catch (error) {
        console.log("Something Went Wrong>>>>>>>>>>>>>",error)
        toast.error("something went wrong")
    }
  }

  //Deletes a category
  const handleDelete = async (cid) => {
try {
    const {data} = await instance.delete(`/api/v1/category/delete-categories/${cid}`)
    if(data.success){
        console.log("Category deleted successfully")
        toast.success("Category deleted successfully")
        getCategory()
    }
} catch (error) {
    console.log("Something went wrong in deleting category")
    toast.error("Something went wrong in deleting category")
}
}

  return (
   <Layout title={"Dashbaord - Create Category"}>
    <div className='container-fluid p-2'>
      <div className="flex flex-row gap-2">
      <div className="">
      <AdminMenu/>
      </div>
<div className="relative flex-grow overflow-y-auto shadow-md sm:rounded-lg w-full p-3">
   <div className='mb-4'> <h1 className='font-500 text-4xl text-gray-900'>Manage Category</h1></div>
   <div className='w-3/6 pb-2 pr-48'><CategoryForm className="m-12" handleSubmit={handleSubmit} value={name} setValue={setName} /></div>
    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div className='relative'>
            <button id="dropdownRadioButton" onClick={toggleDropdown} data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                    </svg>
                Last 30 days
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
        {isDropdownOpen && (
          <>
            <div id="dropdownRadio" className="z-10 w-48 block absolute mt-3 bg-white divide-y divide-gray-100 rounded-lg shadow "  >
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="filter-radio-example-2" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="filter-radio-example-3" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="filter-radio-example-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="filter-radio-example-5" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                        </div>
                    </li>
                </ul>
            </div>
            </>
        )}
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <AiOutlineSearch className="text-gray-500 dark:text-gray-400" />
            </div>
            <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Category name
                </th>
            
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
  {category?.map((c) => (
    <tr key={c._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id={`checkbox-table-search-${c._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor={`checkbox-table-search-${c._id}`} className="sr-only">checkbox</label>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {c.name ? c.name : 'No name'}
      </td>
      <td className="px-6 py-4">
        <div className='flex gap-2'>
        <button href="#" className="font-medium text-blue-600  hover:underline" onClick={()=>{setIsModalOpen(true) ; setUpdateName(c.name); setSelected(c)}}>Edit</button>
        <button href="#" className="font-medium text-red-600  hover:underline" onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

    </table>
</div>

<Modal onCancel={()=>{setIsModalOpen(false)}} footer={null} visible={isModalOpen} >
    <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
</Modal>


    </div>
      </div>
   </Layout>
  )
}

export default CreateCategory
