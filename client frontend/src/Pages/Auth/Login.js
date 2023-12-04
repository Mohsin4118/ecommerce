import React, { useState } from 'react';
import '../style.css'
import {useNavigate, useLocation} from 'react-router-dom'
import Layout from '../../Components/LayOuts/Layout';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/authSlice';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const instance = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Register Successfully")
try {
    const res = await instance.post(`/api/v1/auth/login`, 
    {email, password})
    if(res && res.data.success){
        toast.success(res.data && res.data.message)
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        // localStorage.setItem('auth', JSON.stringify({ user: res.data.user, token: res.data.token }))
        navigate(location.state || '/')
    }else{
        toast.error(res.data.message)
    }
} catch (error) {
    console.log(error)
    toast.error("Something went wrong")
}
};

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center m-3 p-24'>
        <h2 className='text-2xl font-bold mb-6 text-[#F4CE14] dark:text-white'>Login Form</h2>
        <form className='w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-offset-right-bottom' onSubmit={handleSubmit}>
          <InputField label='Email address' type='email' value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
          <InputField label='Password' type='password' value={password} required={true} onChange={(e) => setPassword(e.target.value)} />
          <div className='flex flex-col gap-3'>
          <Button text="Forgot Password" colorVariant="green" textColor="white" onClick={()=>{navigate("/forget-password")}} />
          <Button text="Login" colorVariant="yellow" textColor="white" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Login
