import React from 'react'
import Layout from '../Components/LayOuts/Layout'
import { useCategory } from '../hooks/useCategory'
import { Link } from 'react-router-dom'

export const Categories = () => {

    const categories = useCategory()

  return (
    <Layout title={"All Categories"}>
    <div className="container-fluid">
        <div className='flex flex-col'>
            <div className='flex justify-center items-center p-4'>
            <p className='text-lg font-semibold'>All Categories</p>
            </div>
            <div className='grid grid-cols-2 gap-3 p-2'>
            {categories.map((c)=>(
            <div key={c._id} className='flex justify-center items-center pb-3 w-full'>
            <Link to={`/categories/${c.slug}`} className='bg-blue-400 text-white font-bold text-base w-full p-3 rounded rounded-lg'>
                {c.name}
            </Link>
            </div>
            ))}
            </div>
        </div>
    </div>
    </Layout>
  )
}
