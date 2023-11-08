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
         const data = await userModel.findOne({email:req.query.visit});
         await userModel.updateOne({email:req.query.email},{visit:req.query.visit})
         await userModel.updateOne({email:req.query.visit},{views:parseInt(data.views)+1})
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
        connection:outsider.connected.length,
       
      })
    }else{
    
      res.json({
        name:outsider.username,
        email:outsider.email,
        followers:outsider.followers,
        discription:outsider.discription,
        post:outsider.post,
        connectionRes:responsedata[0].connection,
        connection:outsider.connected.length,
       
      })
    }
      
      
    
   
    } catch (error) {
      console.log('NOT FOUND:-'+error)
    }
    
    
  },
  getprofiledata:(req,res)=>{
    res.json({
      name: req.body.username,
      email: req.body.email,
      views: req.body.views,
      followers: req.body.followers,
      post: req.body.post,
      discription: req.body.discription,
      visit: req.body.visit,
      request: req.body.request,
      invited: req.body.invited,
      connected: req.body.connected,
    });
  }
}

module.exports = allprofile;