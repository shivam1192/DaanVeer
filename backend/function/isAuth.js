const jwt = require('jsonwebtoken')

const isAuth = (req)=>{
        const author = req.header('auth-token')
        if(author){
            try{
                const userID = jwt.verify(author,process.env.ACCESS_TOKEN)
                return userID.id
            }catch(err){
                console.log(err)
            }
        }
}
module.exports={
    isAuth
}