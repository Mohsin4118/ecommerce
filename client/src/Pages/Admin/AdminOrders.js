import React, { useEffect, useState } from 'react'
import Layout from '../../Components/LayOuts/Layout'
import AdminMenu from '../../Components/LayOuts/AdminMenu'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { Select } from 'antd'

const AdminOrders = () => {

const authState = useSelector((state) => state.auth)
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`, 
    },
  });
const [orders, setOrders] = useState([])
const [statuses, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
const [changeStatus, setChangeStatus] = useState("")
const status = ['jack', 'lucy', 'Yiminghe', 'disabled'];
const getAllOrders = async () => {
try {
    const {data} = await instance.get('/api/v1/auth/all-orders')
    // getAllOrders()
    setOrders(data)
} catch (error) {
    console.log(error)
}
}


const handleChange = async (orderId, value) => {
    console.log(value)
    try {
        const {data} = await instance.put(`/api/v1/auth/status/${orderId}`, {status: value})
        setChangeStatus(data?.status)
        console.log(changeStatus)
        
    } catch (error) {
        
    }
}

useEffect(()=>{
    if(authState?.token) getAllOrders();
},[authState?.token],changeStatus)
  return (
    <Layout title={"Admin Orders Details"}>
      <div className='container-fluid p-2'>
        <div className='flex flex-row gap-2'>
        <div className="">
        <AdminMenu/>
        </div>
        <div className='w-full'>
        <h1 className='text-center font-bold text-xl text-yellow-400 mt-4'>Order Details</h1>
        {orders?.map((o,i)=>{
            return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 text-base">
                    #
                </th>
                <th scope="col" class="px-6 py-3 text-base">
                    Status
                </th>
                <th scope="col" class="px-6 py-3 text-base">
                    Buyer
                </th>
                <th scope="col" class="px-6 py-3 text-base">
                    Date
                </th>
                <th scope="col" class="px-6 py-3 text-base">
                    Payment
                </th>
                <th scope="col" class="px-6 py-3 text-base">
                    Quantity
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {i+1}
                </th>
                <td class="px-6 py-4 font-semibold">
                    <Select bordered = {false} onChange={(value) => handleChange(o._id,value)} defaultValue={o?.status}>
                    {statuses.map((s, i) => (
                        <Select.Option key={i} value={s}>
                            {s}
                        </Select.Option>
                    ))}
                    </Select>

                </td>
                <td class="px-6 py-4 font-semibold">
                    {o?.buyer.name}
                </td>
                <td class="px-6 py-4 font-semibold">
                    {moment(o?.createdAt).fromNow()}
                </td>
                <td class="px-6 py-4 font-semibold">
                    {o?.payment.success ? "success" : "failed"}
                </td>
                <td class="px-6 py-4 font-semibold">
                    {o?.products.length}
                </td>
            </tr>
        </tbody>
        </table>
        
        {o?.products?.map((p, index) => {
        return (
          <div key={p._id} className='flex flex-row gap-6 mt-4'>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                    className="rounded-lg mb-4 ml-6 shadow-md w-80 shadow-md"
                  />
                  <div className='flex flex-col pt-8'>
                  <p className='font-semibold '>{p.name}</p>
                  <p className='font-normal'>{p.description.substring(0, 30)}</p>
                  <p className='font-bold text-lg'>Price: {p.price}</p>
                  </div>
                  </div>
        );
      })}

        </div>
          )
        })}
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminOrders
