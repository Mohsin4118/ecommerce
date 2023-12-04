import React from 'react'
import Layout from '../Components/LayOuts/Layout'
import { useSelector } from 'react-redux';

const Home = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <Layout title={"Best Offers"}>
      <h1>Home</h1>
      <pre>{JSON.stringify(authState.user)}</pre>
      <pre>{JSON.stringify(authState.token)}</pre>
    </Layout>
  
)}

export default Home
