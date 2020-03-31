const express = require("express");
const Route = express.Router();
const UserMongoosemodal = require("../Modals/Userschema");
const NGOMongoosemodal = require("../Modals/NGOschema")
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const {accesstoken,refreshtoken,sendaccesstoken,sendrefreshtoken} = require("../function/jwt");
const {isAuth} = require('../function/isAuth')




const user_schema = Joi.object({
    user_name: Joi.string().required().min(6),
    user_email: Joi.string().required().min(6).email(),
    user_password: Joi.string().required().min(6),
    user_mobile_no : Joi.string().required().min(10).max(11)
})

const ngo_schema = Joi.object({
    ngo_name: Joi.string().required().min(6),
    ngo_email: Joi.string().required().min(6).email(),
    ngo_password: Joi.string().required().min(6),
    ngo_bio : Joi.string().required(),
    is_ngo: Joi.boolean().required()
})


const login_user_schema = Joi.object({
    user_email: Joi.string().required().min(6).email(),
    user_password: Joi.string().required().min(6),
    refreshtoken: Joi.string()
})

Route.post("/userregister",async (req,res)=>{
    const {user_name,user_email,user_password,user_mobile_no} = req.body;
    const validation = user_schema.validate(req.body)

    if(validation.error){
        res.status(203).send(validation.error.details[0].message)
    }
    else{
        const email_duplicate = await UserMongoosemodal.findOne({user_email:user_email});
        if(email_duplicate){
            res.status(203).send("email already exist")
                }
        else{
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user_password,salt);
            
            const new_user = new UserMongoosemodal({
                user_name,
                user_email,
                user_password:hash,
                user_mobile_no:user_mobile_no,
                refreshtoken:null
            })
            try{
                   const savepost = await new_user.save();
                   res.send(savepost._id)
            }catch(error){
                console.log(error)
                res.status(203).send("Something wrong occured")
            }
        }   
    }
})


Route.post("/ngoregister",async (req,res)=>{
    const {ngo_name,ngo_email,ngo_password,ngo_bio} = req.body;
    const validation = ngo_schema.validate(req.body)

    if(validation.error){
        res.status(203).send(validation.error.details[0].message)
    }
    else{
        const email_duplicate = await NGOMongoosemodal.findOne({ngo_email:ngo_email});
        if(email_duplicate){
            res.status(203).send("email already exist")
                }
        else{
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(ngo_password,salt);
            
            const new_ngo = new NGOMongoosemodal({
                ngo_name,
                ngo_email,
                ngo_password:hash,
                ngo_bio,
                refreshtoken:null,
                is_ngo:true
            })
            try{
                   const savepost = await new_ngo.save();
                   res.send(savepost._id)
            }catch(error){
                console.log(error)
                res.status(203).send("Something wrong occured")
            }
        }   
    }
})



Route.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const got_useremail = await UserMongoosemodal.findOne({user_email:email})
    const got_ngoemail = await NGOMongoosemodal.findOne({ngo_email:email})

    if(got_useremail){
          const password_compare = await bcrypt.compare(password,got_useremail.user_password);
          if(password_compare){
              try{
                 const access = accesstoken(got_useremail._id)
                 const refresh = refreshtoken(got_useremail._id)
                //  store refresh in db
                const set= await UserMongoosemodal.updateOne({_id:got_useremail._id},{$set : {refreshtoken: refresh}})
                // send refrestoken as a cookie and accesscookie as a regular expression
                sendrefreshtoken(res,refresh)
                 sendaccesstoken(res,req,access,got_useremail)              
              }catch(error){
                  console.log(error)
                  res.status(203).send("Something went wrong!!")
              }
          } 
          else{
              res.status(203).send("Your password is incorrect");
          }
    }

    else if(got_ngoemail){
              const password_compare = await bcrypt.compare(password,got_ngoemail.ngo_password);
              if(password_compare){
                  try{
                     const access = accesstoken(got_ngoemail._id)
                     const refresh = refreshtoken(got_ngoemail._id)
                    //  store refresh in db
                    const set= await NGOMongoosemodal.updateOne({_id:got_ngoemail._id},{$set : {refreshtoken: refresh}})
                    // send refrestoken as a cookie and accesscookie as a regular expression
                    sendrefreshtoken(res,refresh)
                     sendaccesstoken(res,req,access,got_ngoemail)              
                  }catch(error){
                      res.status(203).send("Something went wrong!!")
                  }
              } 
              else{
                  res.status(203).send("Your password is incorrect");
              }
    }
    else{
        res.status(203).send("id not exist either in ngo or user register now");
    }
})


Route.post('/logout',(req,res)=>{
    res.clearCookie("refreshtoken",{path:'/'})
    return res.send("")
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
    if(!r) return res.send("")
    let payload = null
    try{
         payload = Jwt.verify(r,process.env.REFRESH_TOKEN)
    }catch(err){
        return res.send("")
    }
    const user = await UserMongoosemodal.find({_id:payload.id})
        if(!user) return res.send("")
    if(!user.refreshtoken==r) return res.send("")

    const access = accesstoken(user._id)
    const refresh = refreshtoken(user._id)


        const set= await UserMongoosemodal.updateOne({_id:user._id},{$set : {refreshtoken: r}})
                return res.send(access)
})



module.exports = Route;