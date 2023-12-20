import React, { useEffect, useState } from 'react'
import Layout from '../../Components/LayOuts/Layout'
import UserMenu from '../../Components/LayOuts/UserMenu'
import axios from 'axios'
import { useSelector } from 'react-redux';
import moment from 'moment';

const Orders = () => {
  const authState = useSelector((state) => state.auth);
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`, 
    },
  });

  const [order, setOrder] = useState([])

const getOrders = async () => {
try {
  const {data} = await instance.get('/api/v1/auth/orders')
  console.log(">>>>>>>>>>>>>>>>>>>>",data)
  setOrder(data)
} catch (error) {
  console.log(error)
}  
}

useEffect(()=>{
  if(authState?.token) getOrders();
},[authState?.token])


  return (
    <Layout title={"Your Orders"}>
      <div className='container-fluid m-2 p-2'>
      <div className="flex flex-row gap-2">
      <div className="">
      <UserMenu/>
      </div>
      <div className="flex flex-col w-full">
        <h1 className='flex justify-center items-center mt-4 font-bold text-xl'>Order Details</h1>
          {order?.map((o,i)=>{
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
                    {o?.status}
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

export default Orders
