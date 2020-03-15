const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")
const accesstoken = (id) =>{
     return auth = jwt.sign({id},process.env.ACCESS_TOKEN,{
         expiresIn:'15m'
     })
}

const refreshtoken = (id) =>{
    return jwt.sign({id},process.env.REFRESH_TOKEN,{
        expiresIn:'7d'
    })
}

const sendaccesstoken = (res,req,accesstoken) =>{
    res.send(
        accesstoken
    )   
}
const sendrefreshtoken = (res,refreshtoken) =>{
    res.cookie("refreshtoken",refreshtoken,{
        httpOnly:true,
        path: '/refresh_token'
    })
    console.log("hello")
}
module.exports = {accesstoken,refreshtoken,sendaccesstoken,sendrefreshtoken}