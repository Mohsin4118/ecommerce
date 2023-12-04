import React from 'react'
import Layout from '../../Components/LayOuts/Layout'
import AdminMenu from '../../Components/LayOuts/AdminMenu'

const Users = () => {
  return (
    <Layout title={"Dashbaord - All Users"}>
      <div className='container-fluid p-2 m-3'>
      <div className="flex flex-row gap-2">
      <div className="">
      <AdminMenu/>
      </div>
      <div className="">
      </div>
    </div>
      </div>
    </Layout>
  )
}

export default Users
