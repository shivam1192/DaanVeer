import React,{useState, useEffect,useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import Axios from 'axios'

const Refresh = (props) => {
    const {Auth,setauth} = useContext(AuthContext)

        useEffect(()=>{
            const refresh = async() =>{
             Axios.post('http://localhost:4000/refresh_token',{withCredentials:true}).then((res)=>{
               setauth(res.data)
               console.log(Auth)
            }).catch((err)=>{
              console.log("heloo")
            })}
      refresh()
          },[])

    return ( 
        <div>
           {props.children}
           </div>
     );
}
 
export default Refresh;