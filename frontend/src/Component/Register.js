import React, { useContext, useState, useEffect } from 'react';
import { LoadContext } from '../Context/LoadContext';
import {Link, Redirect} from 'react-router-dom'
import {Card,CardContent,Typography,makeStyles,TextField,Button} from '@material-ui/core'
import Axios from 'axios'
import Loading from '../Structure/Loading'
import Navbar from '../Structure/Navbar';

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

const Register = () => {
    const {Load,setloadTrue,setloadFalse} = useContext(LoadContext)

    const [status,setStatus] = useState(false)
    const [error,setError] = useState()
    const [register,setRegister] = useState(false)
    const classes = useStyles();

    const submitfunction = (event) =>{
        event.preventDefault()
        setloadTrue()
        Axios.post('http://localhost:4000/register',{
            user_name: event.target.username.value,
            user_email: event.target.useremail.value,
            user_password: event.target.password.value
        }).then((res)=>{
            if(res.status==200){
                setStatus(false)
                setRegister(true)
            }else{
                setStatus(true)
                setError(res.data)
            }   
            setloadFalse()         
        }).catch((err)=>{
            console.log(err)
            setloadFalse()
        })
    }

    if(register){
        return(<Redirect to="/login"/>)
    }
    else if(localStorage.getItem("access token")){
        return(<Redirect to="/dashboard"/>)
    }
    else{
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
                CREATE ACCOUNT
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
              <TextField id="outlined-basic" label="Username" variant="outlined" className={classes.text} name="username" required/><br/><br/>
              <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.text} name="useremail" required/><br/><br/>
              <TextField id="outlined-password-input" label="Password" type="password"  className={classes.text} name="password" autoComplete="current-password" variant="outlined" required/><br/><br/><br/>
              <Button variant="contained" color="primary" className={classes.text} type="submit">
            SignUp
          </Button><br/><br/>
          </form>
          <Typography variant="caption" className={classes.text}>
              Already have an account? <Link to='/login'>Login</Link>
              </Typography>
            </CardContent>
          </div>
        </Card>
        </div>
    }
            </div>
         );
    }

   
}
 
export default Register;