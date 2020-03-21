import React from 'react';
import {AppBar,Toolbar,IconButton,Typography,Button,makeStyles} from '@material-ui/core'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
    return ( 
        <div>
    <AppBar position="static">
        <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <LibraryAddIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
        </div>
     );
}
 
export default Navbar;