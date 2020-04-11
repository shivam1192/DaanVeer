
import React from 'react';
import Blog from './Allblog'
const Contentfetchuser = (props) => {
    if(props.count===1){
        return <Blog/>
    }
    else if(props.count===2){
        return (<div>dsc</div>)
    }else{
        return (<div>dsc</div>)
    }
}
 
export default Contentfetchuser;
