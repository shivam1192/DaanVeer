import React,{useContext} from 'react';
import {LoadContext} from '../Context/LoadContext'
import {Redirect} from 'react-router-dom'
import Navbar from '../Structure/Navbar'
import Loading from '../Structure/Loading'
import {Grid,Paper,makeStyles, Button} from '@material-ui/core'


const Dashboard = () => {

    const {Load,setloadTrue,setloadFalse} = useContext(LoadContext)


    const logoutfunction = () =>{
        localStorage.removeItem("access token")
        window.location.reload();
    }

    if(localStorage.getItem("access token")){
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
                    <Button onClick={logoutfunction}>Logout</Button>
            </div>
    }
        </div>
        );
    }
    else{
        return(
        <Redirect to="/login"/>
        )}
    
}
 
export default Dashboard
;