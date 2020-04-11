import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Card,CardActionArea,CardContent,Typography,Button,makeStyles,CardActions} from '@material-ui/core'
import Blogauthor from '../Structure/Blogauthor'
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
const Blog = () => {
    const [Blog,setBlog] = useState([])
    const classes = useStyles();


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
           <div className={classes.container}>
               { Blog.map((i)=>{
        return(
        <Card className={classes.root}>
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
          <Button size="small" color="primary" className="classes.button">
                Donate
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
 
export default Blog;