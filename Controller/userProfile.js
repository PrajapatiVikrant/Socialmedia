const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allprofile = {
    visit:async(req,res)=>{

        let data = await userModel.updateOne({email:req.query.email},{visit:req.query.visit})
        res.send('success')
      },

      //To visit any profile
showvisitprofile:async(req,res)=>{
    try {
      let outsider = await userModel.findOne({email:req.params.profile})
     let responsedata = outsider.response.filter((elem,ind)=>{
        return elem.email === req.params.email;
     })
    if(!responsedata[0]){
     
      res.json({
        name:outsider.username,
        email:outsider.email,
        followers:outsider.followers,
        discription:outsider.discription,
        post:outsider.post,
        connectionRes:'connect',
        connection:'4',
       
      })
    }else{
    
      res.json({
        name:outsider.username,
        email:outsider.email,
        followers:outsider.followers,
        discription:outsider.discription,
        post:outsider.post,
        connectionRes:responsedata[0].connection,
        connection:'4',
       
      })
    }
      
      
    
   
    } catch (error) {
      console.log('NOT FOUND:-'+error)
    }
    
    
  }
}

module.exports = allprofile;