import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie'
import {Card,CardActionArea,CardContent,Typography,Button,makeStyles,CardActions} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      width: 340,
      border: "1px solid blue"
    },
    container:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center'
    }
  });
const Blogbyngo = () => {
    const [Blog,setBlog] = useState([])
    const classes = useStyles();


    useEffect(()=>{
        const getdata = async() =>{
            const str = "http://localhost:4000/blogbyngo/" + Cookies.get('refreshtoken') 
            Axios.get(str).then((res)=>{
                setBlog(res.data)   
        }).catch((err)=>{
            console.log(err)
        })
        }
       getdata()
    },[])

if(Blog.length!=0){
       return(
           <div className={classes.container}>
               { Blog.map((i)=>{
        return(
        <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {i.Blog_title}
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
          <Button size="small" color="primary">
            Delete Project
          </Button>
        </CardActions>
      </Card>)
    })}
               </div>
       )
}else{
    return (<div>Loading....</div>)
}
}
 
export default Blogbyngo;