import React from 'react';
import Blogform from './Blogform'
import Blogbyngo from './Blogbyngo'

const Contentfetch = (props) => {
    if(props.count===1){
        return <Blogform/>
    }
    else if(props.count===2){
        return <Blogbyngo/>
    }else{
        return (<div>dsc</div>)
    }
}
 
export default Contentfetch;