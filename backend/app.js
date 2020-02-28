const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());


app.listen(process.env.LOCALHOST,()=>{
    console.log("your server is running at 4000");
})