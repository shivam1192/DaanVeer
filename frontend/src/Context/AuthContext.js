import React,{createContext,useState,useEffect} from 'react';
import Axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [Auth,setAuth] = useState({
        Accesstoken: ""
    })

   
    const setauth= (data) =>{
        setAuth({
            Accesstoken:data
        })
    }
    
    return ( 
        <AuthContext.Provider value={{Auth,setauth:setauth}}>
           {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;