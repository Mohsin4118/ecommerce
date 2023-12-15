import React, { useEffect, useState } from 'react';
import Layout from '../../Components/LayOuts/Layout'
import UserMenu from '../../Components/LayOuts/UserMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

const Profile = () => {

  const instance = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(()=>{
    const {name, email, phone,address} = authState?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[authState?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Register Successfully")
try {
    const res = await instance.post(`/api/v1/auth/register`, 
    {name, email, password, phone,address})
    
} catch (error) {
    console.log(error)
    toast.error("Something went wrong")
}
};

  return (
    <Layout title={"Your Profile"}>
      <div className='container-fluid m-2 p-2'>
      <div className="flex flex-row gap-2">
      <div className="">
      <UserMenu/>
      </div>
      <div className="p-3 flex flex-col w-full">
        <h1 className='text-center'>manage Profile</h1>
        <div className='flex justify-center items-center'>
        <form className='w-full mt-6 max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-offset-right-bottom' onSubmit={handleSubmit}>
          <InputField label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label='Email address' type='email' value={email} required={true} disabled={true} onChange={(e) => setEmail(e.target.value)} />
          <InputField label='Password' type='password' value={password} required={true} onChange={(e) => setPassword(e.target.value)} />
          {/* <InputField label='Confirm Password' type='password' value={confirmPassword} required={true} onChange={(e) => setConfirmPassword(e.target.value)} /> */}
          <InputField label='Phone number' type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' value={phone} required={true} onChange={(e) => setPhone(e.target.value)} />
          <InputField label='Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
          <Button text="UPDATE" colorVariant="yellow" textColor="white" borderColorVariant="blue" />
        </form>
        </div>
      </div>
    </div>
      </div>
    </Layout>
  )
}

export default Profile
