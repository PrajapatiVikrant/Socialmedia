const express = require("express");
const mongoose = require("mongoose");
require("./Config/mydb");
const fileupload = require('express-fileupload');
const cors = require("cors");
const app = express();
app.use(fileupload({
    useTempFiles:true
}))
app.use(cors());

//all middleware
app.get('/getall',async(req,res)=>{
    console.log('hello')
    let data = await userModel.find({});
    console.log(data)
    res.send(data);
})
app.delete('/deleteall',async(req,res)=>{
    console.log('hellodelete')
    let data = await userModel.deleteMany({email:'ajay@gmail.com'})
    console.log(data)
    res.send(data);
})
app.use('/Socialmedia',require("./Route"))


app.listen(4000,()=>{
    console.log('Server listen at 4000 port');
});
