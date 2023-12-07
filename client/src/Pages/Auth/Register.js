import React, { useState } from 'react';
import '../style.css'
import {useNavigate} from 'react-router-dom'
import Layout from '../../Components/LayOuts/Layout';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Register Successfully")
try {
    const res = await instance.post(`/api/v1/auth/register`, 
    {name, email, password, phone,address, answer})
    if(res && res.data.success){
        toast.success(res.data && res.data.message)
        navigate('/login')
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
        <h2 className='text-2xl font-bold mb-6 text-[#F4CE14] dark:text-white'>Register</h2>
        <form className='w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-offset-right-bottom' onSubmit={handleSubmit}>
          <InputField label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label='Email address' type='email' value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
          <InputField label='Password' type='password' value={password} required={true} onChange={(e) => setPassword(e.target.value)} />
          {/* <InputField label='Confirm Password' type='password' value={confirmPassword} required={true} onChange={(e) => setConfirmPassword(e.target.value)} /> */}
          <InputField label='Phone number' type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' value={phone} required={true} onChange={(e) => setPhone(e.target.value)} />
          <InputField label='Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
          <InputField label='What is your best Friend Name' type='text' value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <Button text="Register" colorVariant="yellow" textColor="white" borderColorVariant="blue" />
        </form>
      </div>
    </Layout>
  );
};

export default Register;
