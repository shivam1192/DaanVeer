const express = require("express");
const Route = express.Router();
const Mongoosemodal = require("../Modals/schema");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const {accesstoken,refreshtoken,sendaccesstoken,sendrefreshtoken} = require("../function/jwt");
const {isAuth} = require('../function/isAuth')
const user_schema = Joi.object({
    user_name: Joi.string().required().min(6),
    user_email: Joi.string().required().min(6).email(),
    user_password: Joi.string().required().min(6),
})
const login_user_schema = Joi.object({
    user_email: Joi.string().required().min(6).email(),
    user_password: Joi.string().required().min(6),
    refreshtoken: Joi.string()
})

Route.post("/register",async (req,res)=>{
    const {user_name,user_email,user_password} = req.body;
    const validation = user_schema.validate(req.body)

    if(validation.error){
        res.status(203).send(validation.error.details[0].message)
    }
    else{
        const email_duplicate = await Mongoosemodal.findOne({user_email:user_email});
        if(email_duplicate){
            res.status(203).send("email already exist")
                }
        else{
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user_password,salt);
            
            const new_user = new Mongoosemodal({
                user_name,
                user_email,
                user_password:hash,
                refreshtoken:null
            })
            try{
                   const savepost = await new_user.save();
                   res.send(savepost._id)
            }catch(error){
                res.status(203).send("Something wrong occured")
            }
        }   
    }
})

Route.post("/login",async(req,res)=>{
    const {user_email,user_password} = req.body
    const got_email = await Mongoosemodal.findOne({user_email:user_email})
    if(got_email){
          const password_compare = await bcrypt.compare(user_password,got_email.user_password);
          if(password_compare){
              try{
                 const access = accesstoken(got_email._id)
                 const refresh = refreshtoken(got_email._id)
                //  store refresh in db
                const set= await Mongoosemodal.updateOne({_id:got_email._id},{$set : {refreshtoken: refresh}})
                // send refrestoken as a cookie and accesscookie as a regular expression
                sendrefreshtoken(res,refresh)
                 sendaccesstoken(res,req,access)              
              }catch(error){
                  res.status(203).send("Something went wrong!!")
              }
          } 
          else{
              res.status(203).send("Your password is incorrect");
          }
    }
    else{
        res.status(203).send("id not exist register now");
    }
})

Route.post('/logout',(req,res)=>{
    res.clearCookie("refreshtoken",{path:'/refresh_token'})
    return res.send({accesstoken:""})
})

Route.post('/protected', async(req,res)=>{
    try{
                 const id = isAuth(req)
                 if(id){
                     res.send("This is protected data")
                 }
                 else{
                     res.status(203).send("User not logged in")
                 }

    }catch(err){
        res.status(203).send("not permitted")
    }
})




Route.post('/refresh_token',async(req,res)=>{
    const r = req.cookies.refreshtoken;
    console.log(r)
    if(!r) return res.send({accesstoken:''})
    let payload = null
    try{
         payload = Jwt.verify(r,process.env.REFRESH_TOKEN)
    }catch(err){
        return res.send({accesstoken:''})
    }
    const user = await Mongoosemodal.find({_id:payload.id})
        if(!user) return res.send({accesstoken:''})
    if(!user.refreshtoken==r) return res.send({accesstoken:''})

    const access = accesstoken(user._id)
    const refresh = refreshtoken(user._id)


        const set= await Mongoosemodal.updateOne({_id:user._id},{$set : {refreshtoken: r}})
                // send refrestoken as a cookie and accesscookie as a regular expression
                sendrefreshtoken(res,refresh) 
                return res.send({accesstoken:access})
})
module.exports = Route;