import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import Layout from '../../Components/LayOuts/Layout';
import AdminMenu from '../../Components/LayOuts/AdminMenu';

const Products = () => {
  const [products, setProducts] = useState([]);
  const authState = useSelector((state) => state.auth);

  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `${authState.token}`,
    },
  });

  const getProducts = async () => {
    try {
      const { data } = await instance.get(`/api/v1/products/get-product`);
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting products');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout title={'Products - Ecommerce'}>
      <div className='container-fluid p-2'>
        <div className='flex flex-row gap-2'>
          <div>
            <AdminMenu />
          </div>
          <div className='mb-4 flex flex-col w-full text-center'>
            <div className='flex flex-initial'>
              <h1 className='font-500 text-4xl text-gray-500'>All Products</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
              {products.map((p, index) => (
                <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div
                key={p._id}
                className='bg-white rounded-md p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-72 md:w-48 lg:w-72'
                style={{ minWidth: '15rem' }}
                >
                    <img src={`/api/v1/products/product-photo/${p._id}`} alt=''/>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Name: <span className='text-yellow-500'>{p.name}</span></p>
                </div>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Description: <span className='text-yellow-500'>{p.description}</span></p>
                </div>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                <p>Price: <span className='text-yellow-500'>{p.price}</span></p>
                </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;