const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookie = require("cookie-parser")

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookie())
app.use("/",require("./Routers/initial"));

app.listen(process.env.LOCALHOST,()=>{
    console.log("your server is running at 4000");
})

mongoose.connect(process.env.MONGOOSE_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
       if(err)console.log(err);
       else console.log("Mongoose server is ready");
})