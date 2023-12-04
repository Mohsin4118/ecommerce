import React, { useState } from 'react';
import '../style.css'
import {useNavigate} from 'react-router-dom'
import Layout from '../../Components/LayOuts/Layout';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
  
    const instance = axios.create({
      baseURL: 'http://localhost:5000', 
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // toast.success("Register Successfully")
  try {
      const res = await instance.post(`/api/v1/auth/forget-password`, 
      {email, newPassword, answer})
      console.log(">>>>>>>>>>>", res)
      if(res && res.data.success){
          toast.success(res.data && res.data.message)
          navigate('/login')
      }else{
          toast.error(res.data.message)
      }
  } catch (error) {
      console.log("<<<<<<<<<<<<<<<<<<<<+",error)
      toast.error("Something went wrong")
  }
  };
  return (
    <Layout title={"Forget Password - Ecommerce App"}>
      <div className='flex flex-col items-center justify-center m-3 p-24'>
        <h2 className='text-2xl font-bold mb-6 text-[#F4CE14] dark:text-white'>Forget Password</h2>
        <form className='w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-offset-right-bottom' onSubmit={handleSubmit}>
          <InputField label='Email address' type='email' value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
          <InputField label='New Password' type='password' value={newPassword} required={true} onChange={(e) => setNewPassword(e.target.value)} />
          <InputField label='Enter Your Best Friend Name' type='text' value={answer} required={true} onChange={(e) => setAnswer(e.target.value)} />
          <div className='flex flex-col gap-3'>
          <Button text="Reset" colorVariant="yellow" textColor="white" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgetPassword
