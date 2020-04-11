import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Card,CardActionArea,CardContent,Typography,Button,makeStyles,CardActions,withStyles} from '@material-ui/core'
import Blogauthor from '../Structure/Blogauthor'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles({
    roots: {
      width: 340,
      border: "1px solid blue"
    },
    container:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center'
    },
    
  });
  
const styles = (theme) => ({
  
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
const Blog = () => {
    const [Blog,setBlog] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(()=>{
        const getdata = async() =>{
            Axios.get("http://localhost:4000/blog").then((res)=>{
                setBlog(res.data)   
        }).catch((err)=>{
            console.log(err)
        })
        }
       getdata()
    },[])

    // const getauthor = (id) =>{
    //     console.log("hello")
    //     const getdata = async() =>{
    //         let url = "http://localhost:4000/blogauthor/"+id
    //         Axios.get(url).then((res)=>{
    //              return (<div>{res.data.ngo_name}</div>)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })}
    //    getdata()
    // }
if(Blog.length!=0){
       return(
           <div className = {classes.root}>
           <div className={classes.container}>
               { Blog.map((i)=>{
        return(
        <Card className={classes.roots}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {i.Blog_title}
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary" component="h2">
                <Blogauthor id={i.Blog_author}/>  
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {i.Blog_content}
            </Typography><br/><br/>
            <Typography variant="body2" color="textSecondary" component="p">
              Total Amount Required : {i.Blog_amount}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Wallet Address : {i.Blog_wallet}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" className="classes.button">
            Amount Raised
          </Button>
          <Button size="small" color="primary" className="classes.button" onClick={handleClickOpen}>
                Donate
          </Button>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {i.Blog_wallet}
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
        </CardActions>
      </Card>)
    })}
               </div>
               </div>
       )
}else{
    return (<div>Loading....</div>)
}
}
 
export default Blog;