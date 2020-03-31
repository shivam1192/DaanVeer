import React,{useContext} from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button,makeStyles} from '@material-ui/core'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { AuthContext } from '../Context/AuthContext';
import {Link} from 'react-router-dom'
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navbar = () => {
    const classes = useStyles();

    const {Auth,setauth} = useContext(AuthContext)


    
    const logoutfunction = () =>{
      Axios.post("http://localhost:4000/logout",{},{withCredentials:true}).then((res)=>{
          setauth(res.data)
      }).catch((err)=>{
           alert("something went wrong")
      })
  }

    return ( 
        <div>
    <AppBar position="static">
        <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <LibraryAddIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      DaanVeer
    </Typography>
    {Auth  ?
    <div>
    <Button color="inherit" onClick={logoutfunction}>Logout</Button>
    </div>
     : 
     <div>
      <Link to="/register" style={{ color: '#FFF', padding:'40px'}}>Register</Link>
      <Link to="/login" style={{ color: '#FFF', padding:'3px'}}>Login</Link>

    </div>
    }
  </Toolbar>
</AppBar>
        </div>
     );
}
 
export default Navbar;