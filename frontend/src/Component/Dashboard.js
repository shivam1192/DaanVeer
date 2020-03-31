import React,{useContext,useEffect,useState} from 'react';
import {LoadContext} from '../Context/LoadContext'
import {Redirect} from 'react-router-dom'
import Navbar from '../Structure/Navbar'
import Loading from '../Structure/Loading'
import {Grid,Paper,makeStyles, Button} from '@material-ui/core'
import Axios from 'axios';
import { AuthContext } from '../Context/AuthContext';


const Dashboard = () => {

    const {Load,setloadTrue,setloadFalse} = useContext(LoadContext)
    const {Auth,setauth} = useContext(AuthContext)

    let header = {
        headers : {'Authorization' : 'Bearer ' + Auth}
    }
    useEffect(()=>{
        setloadTrue()
        const protecteds = () => {
            Axios.post("http://localhost:4000/protected",{},header).then((res)=>{
                if(res.status===203){
                    console.log(res)
                }else{
                    console.log(res)
                }setloadFalse()
           })
        }
      protecteds()
    },[])

if(Auth===""){
    return(
        <div>
        {Load? <div><Loading/></div>
            :
           <div> <Redirect to="/login"/>)</div>
        }
   </div>
    )}else{
    return (  
        <div>
        {Load? <div><Loading/></div>
        :
        <div>
            <Navbar/> 
                <Grid container spacing={3}>
                    <Grid item sm={3}>
                        <Paper style={{height:220,marginTop:20,marginLeft:120}}>hello</Paper>
                     </Grid>
                     <Grid item sm={5}>
                        <Paper style={{height:220,marginTop:20}}>hello</Paper>
                     </Grid>
                     <Grid item sm={3}>
                        <Paper style={{height:220,marginTop:20}}>hello</Paper>
                     </Grid>
                     <Grid item sm={3}>
                        <Paper style={{height:220,marginTop:20,marginLeft:120}}>hello</Paper>
                     </Grid>
                     <Grid item sm={8}>
                        <Paper style={{height:220,marginTop:20}}>hello</Paper>
                     </Grid>
                </Grid>
        </div>
}
    </div>
    )
}
    

}
 
export default Dashboard
;