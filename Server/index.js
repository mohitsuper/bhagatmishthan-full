const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const cors = require('cors');
const router = require('./Router/router');
app.use(cors())
require('dotenv').config();
app.use(express.json());
const url = `${process.env.LOCAL_BASEURL}`

const baseurl = url;
module.exports={baseurl}


mongoose.connect(url)
.then(()=>console.log("Conntion defined successfull"))
.catch((error)=>console.log("Conntion define Error:",error))


app.use('/api',router)
app.use('/upload', express.static('upload'));
app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})