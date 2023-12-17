import React, { useEffect, useState } from 'react'
import Layout from '../Components/LayOuts/Layout'
import { useSelector, useDispatch } from 'react-redux'
import {removeFromCart, clearCart} from '../store/cart'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

export const Cartpage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [clientToken, setClientToken] = useState("")
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("")
  const navigate = useNavigate()

  const baseUrl = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`,
    },
  });

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const totalPrice = () => {
    try {
      let total = 0
      cartItems.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    } catch (error) {
      console.log(error)
    }
  }

  //get payment gateway token
  const getToken = async () => {
    console.log("in getToken")
    try {
      console.log("make Api request")
      const {data} = await baseUrl.get("/api/v1/products/braintree/token")
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(">>>>>>>>",clientToken)

  useEffect(()=>{
    getToken()
  },[authState?.token])

  const handlePayment = async () => {
    try {
      console.log("in handlEpaymemnt")
      setLoading(true)
      const {nonce} = await instance.requestPaymentMethod();
      const {data} = baseUrl.post("/api/v1/products/braintree/payment", {
        nonce, cartItems
      })
      console.log("in handlEpaymemnt make api request")
      setLoading(false)
      dispatch(clearCart());
      navigate("/dashboard/user/orders")
      toast("payment completed successfully")
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>INSTANCE", instance)

  return (
    <Layout title={"Addd Tp Cart"}>
      <div className='conatainer-fluid'>
        <div className='flex flex-col'>
          <p className='font-semibold text-xl text-center mt-4 bg-slate-200 text-green-600'>Hello {authState?.token && authState.user.name}</p>
          <p className='text-center'>{cartItems?.length > 0
          ? `You have ${cartItems.length} items in your cart ${
            authState?.token ? "" : `please login to checkout`}`
             : "Your cart is empty" }</p>
              <div  className='grid grid-cols-12'>
                <div className='col-span-8 p-6'>
             {cartItems?.map( p => (
                  <div key={p._id} className='flex flex-row gap-6'>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                    className="rounded-lg mb-4 ml-6 shadow-md w-80 shadow-md"
                  />
                  <div className='flex flex-col pt-8'>
                  <p className='font-semibold '>{p.name}</p>
                  <p className='font-normal'>{p.description.substring(0, 30)}</p>
                  <p className='font-bold text-lg'>Price: {p.price}</p>
                  <button className='p-2 rounded rounded-md bg-red-600 text-white' onClick={() => handleRemoveFromCart(p._id)}>Remove</button>
                  </div>
                  </div>
             ))}
                </div>
                <div className='col-span-4 p-6'>
                  <div className='flex flex-col justify-center items-center'>
                  <p className='font-medium text-xl'>Cart Summary</p>
                  <p className='font-normal'>Total | Checkout | Payment</p>
                  <div className='border-b border-gray-300 w-full'></div>
                  <p className='mt-4'>Total : <span className='text-lg font-bold'>{totalPrice()}</span></p>
                  {authState?.user?.address ? (
                    <>
                    <div className='flex flex-col'>
                      <p className='text-xl font-semibold'>Current Address</p>
                      <p className='text-lg font-bold text-green-600 text-center'>{authState?.user?.address}</p>
                      <button className='text-white bg-green-600 p-3 w-full rounded rounded-sm' onClick={()=> navigate('/dashboard/user/profile')}>Update Address</button>
                    </div>
                    </>
                  ) : (
                  <div className='mb-3'>
                    {
                      authState.token ? (
                        <button className='text-white bg-green-600 p-3 w-full rounded rounded-sm' onClick={()=> navigate("/dashboard/user/profile")}>Update Address</button>
                      ):(
                        <button className='text-white bg-green-600 p-3 w-full rounded rounded-sm text-lg font-semibold' onClick={()=> navigate("/login", {
                          state: "/cart",
                        })} >Plz Login To Checkout Form</button>
                      )
                    }
                  </div>
                  )}
                  <div className='mt-3'>
                    {clientToken && cartItems.length > 0 ? (
                      <>
                      {/* <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                        /> */}
                          <DropIn
                                options={{
                                  authorization: clientToken,
                                  paypal: {
                                    flow: "vault",
                                  },
                                }}
                                onInstance={(instance) => setInstance(instance)}
                              />
                    <button className='p-2 bg-black text-white font-semibold text-base w-full rounded rounded-xl'
                    onClick={handlePayment}
                    disabled={loading || !instance || !authState?.user?.address}
                    >{loading ? "Processing...." : "make Payment"}</button>
                      </>
                    ):(
                      <p>Loading DropIn...</p>
                    )}
                  </div>
                  </div>
                </div>
              </div>
             <div>

             </div>
        </div>
      </div>
    </Layout>
  )
}
