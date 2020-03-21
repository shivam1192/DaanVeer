import React,{useContext} from 'react';
import {LoadContext} from '../Context/LoadContext'
import Navbar from '../Structure/Navbar'
import Loading from '../Structure/Loading'
import {Grid,Paper,makeStyles} from '@material-ui/core'


const Dashboard = () => {

    const {Load,setloadTrue,setloadFalse} = useContext(LoadContext)
    return (  
        <div>
        {Load? <div><Loading/></div>
        :
        <div>
            <Navbar/> 
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper style={{height:220,marginTop:20,marginLeft:120}}>hello</Paper>
                     </Grid>
                     <Grid item xs={5}>
                        <Paper style={{height:220,marginTop:20}}>hello</Paper>
                     </Grid>
                     <Grid item xs={3}>
                        <Paper style={{height:220,marginTop:20}}>hello</Paper>
                     </Grid>
                     <Grid item xs={3}>
                        <Paper style={{height:220,marginTop:20,marginLeft:120}}>hello</Paper>
                     </Grid>
                     <Grid item xs={8}>
                        <Paper style={{height:220,marginTop:20}}>hello</Paper>
                     </Grid>
                </Grid>
        </div>
}
    </div>
    );
}
 
export default Dashboard
;