import React from 'react'
import Layout from '../../Components/LayOuts/Layout'
import UserMenu from '../../Components/LayOuts/UserMenu'

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
      <div className='container-fluid m-2 p-2'>
      <div className="flex flex-row gap-2">
      <div className="">
      <UserMenu/>
      </div>
      <div className="">
        <h1>Orders</h1>
      </div>
    </div>
      </div>
    </Layout>
  )
}

export default Orders
