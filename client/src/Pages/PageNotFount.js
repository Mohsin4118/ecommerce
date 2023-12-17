import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Components/LayOuts/Layout'

const PageNotFount = () => {
  return (
    <Layout title={"Go back - Page Not Found"}>
      <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-xl">Page Not Found</p>
        <p className="mt-4">
          The page you are looking for does not exist.
        </p>
        <div className='p-4'>
        <Link to="/" className="mt-8 px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-900">
          Go to Home
        </Link>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default PageNotFount
