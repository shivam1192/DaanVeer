const express = require("express");
const Route = express.Router();
const Mongoosemodal = require("../Modals/schema");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");


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
        res.send(validation.error.details[0].message)
    }
    else{
        const email_duplicate = await Mongoosemodal.findOne({user_email:user_email});
        if(email_duplicate){
            res.send("email already exist")
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
                console.log(error)
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
              res.send("logged")
          }else{
              res.send("Your password is incorrect");
          }
    }
    else{
        res.send("id not exist register now");
    }
})

// Route.post("/logout",(req,res)=>{
//     res.clearCookie("refreshtoken",{path});
//     return res.send("Logged out")
// })

// Route.get("/protected",async(req,res)=>{
//     const token = req.header('auth-token')
//     if(!token){
//         res.send("token not verified");
//     }
//     else{
//         try{
//             const verified = Jwt.verify(token,process.env.RANDOM_STRING)
//             console.log(verified)
//         }catch(err){
//             res.send(err)
//         }
//     }
// })
module.exports = Route;