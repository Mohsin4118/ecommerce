import React from 'react'
import Layout from '../../Components/LayOuts/Layout'
import { useSelector } from 'react-redux'; 
import Card from '../../Components/Card';
import UserMenu from '../../Components/LayOuts/UserMenu'

const DashBoard = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className='container-fluid p-2'>
      <div className="flex flex-row gap-2">
      <div className="col-span-3">
      <UserMenu/>
      </div>
      <div className="col-span-9">
      <Card name={authState?.user?.name} email={authState?.user?.email} type={"User"} contact={authState?.user?.phone}/>
      </div>
    </div>
      </div>
    </Layout>
  )
}

export default DashBoard
