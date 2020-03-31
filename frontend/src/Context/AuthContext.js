import React,{createContext,useState,useEffect} from 'react';
import Axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [Auth,setAuth] = useState("")

   
    const setauth= (data) =>{
        setAuth(data)
    }
    
    return ( 
        <AuthContext.Provider value={{Auth,setauth:setauth}}>
           {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;