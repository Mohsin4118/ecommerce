import React, { useEffect } from 'react'
import Layout from '../Components/LayOuts/Layout'
import { useSelector, useDispatch } from 'react-redux'
import {removeFromCart} from '../store/cart'
export const Cartpage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

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

  return (
    <Layout title={"Addd Tp Cart"}>
      <div className='conatainer-fluid'>
        <div className='flex flex-col'>
          <p className='font-semibold text-xl text-center mt-4 bg-slate-200 text-green-600'>Hello {authState?.token && authState.user.name}</p>
          <p className='text-center'>{cartItems?.length > 0
          ? `You have ${cartItems.length} items in your cart ${
            authState?.token ? "" : `please login to checkout`}`
             : "Your cart is empty" }</p>

             {/* <div className='flex'>
              {JSON.stringify(cartItems, null, 4)}
              {cartItems.map(p => (
                <h1 key={p._id}>{p.name}</h1>
              ))}

             </div> */}
             {/* <div  className='grid grid-cols-12'>
              {cartItems?.map((p) => (

              <div className='col-span-8 flex justify-center items-center'>
              <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                  className="rounded-lg mb-4 shadow-md w-full shadow-md"
                />                
              </div>
              ))}
              <div className='col-span-4 flex justify-center items-center'>
                <h1>description</h1>
              </div>
             </div> */}
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
                  <p className='mt-4'>Total : {totalPrice()}</p>
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