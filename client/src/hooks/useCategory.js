import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

export const useCategory = () => {
  const authState = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([])

    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
          Authorization: `${authState.token}`, 
        },
      });

      const getCategories = async () => {
        try {
            const {data} = await instance.get(`/api/v1/category/get-categories`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
      }

      useEffect(()=>{
        getCategories()
      },[])
      
  return categories
}
