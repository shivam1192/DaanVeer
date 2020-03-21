import React, { useContext, useState, useEffect } from 'react';
import { LoadContext } from '../Context/LoadContext';
import {Link, Redirect} from 'react-router-dom'
import {Card,CardContent,Typography,makeStyles,TextField,Button} from '@material-ui/core'
import Axios from 'axios'
import Loading from '../Structure/Loading'
import Navbar from '../Structure/Navbar'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      maxWidth: 500,
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:50,
      height:500
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      textAlign:"center"
    },
    text: {
        marginLeft: 60,
        width:350
    },
    texterror: {
        marginLeft: 60,
        width:350,
        color:'red'
    }

  }));

const Login = () => {
    const {Load,setloadTrue,setloadFalse} = useContext(LoadContext)

    const [status,setStatus] = useState(false)
    const [error,setError] = useState()

    const classes = useStyles();

    
    const submitfunction = (event) =>{
        event.preventDefault()
        Axios.post('http://localhost:4000/login',{
            user_email:event.target.useremail.value,
            user_password:event.target.password.value
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return ( 
        <div>
            {Load? <div><Loading/></div>
            :
            <div>
                <Navbar/> 
            <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.text} >
             Login
          </Typography><br/><br/>
          {status?
          <div>
          <Typography variant="caption" className={classes.texterror}>
              *{error}
            </Typography><br/><br/> </div>
          :null
          }
          <br/>
        <form id="form33" onSubmit={submitfunction}>
          <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.text} name="useremail" required/><br/><br/>
          <TextField id="outlined-password-input" label="Password" type="password"  className={classes.text} name="password" autoComplete="current-password" variant="outlined" required/><br/><br/><br/>
          <Button variant="contained" color="primary" className={classes.text} type="submit">
        SignIn
      </Button><br/><br/>
      </form>
        </CardContent>
      </div>
    </Card>
    </div>
}
        </div>
     );
}
 
export default Login;