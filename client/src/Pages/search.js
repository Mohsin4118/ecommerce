import React from "react";
import Layout from "../Components/LayOuts/Layout";
import { useSelector, useDispatch } from 'react-redux';

const Search = () => {

    const dispatch = useDispatch();
    const values = useSelector((state) => state.search);

    const noProductStyle = {
        color: 'red',
      };
  
      const foundProductsStyle = {
        color: 'blue',
      };
      
return (
   <Layout title={"Search results"}>
    <div className="container">
        <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-2xl">search Results</p>
            {
                <div>
                {values?.results.length < 1 ? (
                  <p style={noProductStyle}>No Products Found</p>
                ) : (
                  <p style={foundProductsStyle}>Found {values?.results.length}</p>
                )}
              </div>
            }
            {/* {values?.results.length < 1 ? "No  Product Found" : `Found ${values?.results.length}`} */}
            <div className="flex w-full gap-6 flex-wrap justify-center items-center mt-5 p-6">
            {values && values?.results.map((p, index)=>(
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
                   onClick={""}
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
            ))}
            </div>
        </div>
    </div>
   </Layout>
)
}
export default Search