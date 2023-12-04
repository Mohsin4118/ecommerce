import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from "../Spinner"

const PrivateRoute = () => {

    const instance = axios.create({
        baseURL: 'http://localhost:5000', 
      });

    const [ok, setOk] = useState(false)
    const authState = useSelector((state) => state.auth);
    useEffect(()=>{
        const authCheck = async ()=>{
            const res = await instance.get(`/api/v1/auth/user-auth`, {
                headers:{
                    "Authorization": authState?.token
                }
            })
            console.log("????????>>>>>>>", res)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(authState?.token) authCheck();
    },[authState?.token])
  return ok ? <Outlet/> :  <Spinner path={""}/>
}
export default PrivateRoute
