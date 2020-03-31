import React,{useState, useEffect,useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import Axios from 'axios'
import Dashboard from './Component/Dashboard'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Register from './Component/Register'
import Login from './Component/Login'
import { LoadContext } from './Context/LoadContext';

const Refresh = (props) => {
    const {Auth,setauth} = useContext(AuthContext)
    const {Load,setloadTrue,setloadFalse} = useContext(LoadContext)

        useEffect(()=>{
        setloadTrue()
            const refresh = async() =>{
             Axios.post('http://localhost:4000/refresh_token',{},{withCredentials:true}).then((res)=>{
               setauth(res.data)
               setloadFalse()
            }).catch((err)=>{
              console.log("heloo")
            })}
      refresh()
          },[])

    return ( 
        <div>
          <BrowserRouter>
             <Switch>
                 <Route path="/register" component={Register}/>
                 <Route path="/login" component={Login}/>
                 <Route path="/dashboard" component={Dashboard}/>
             </Switch>
         </BrowserRouter>
           </div>
     );
}
 
export default Refresh;