const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const Cloudinary = require("cloudinary").v2;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allprofile = {
  uploadPhoto: async (req, res) => {
    const file = req.files.userfile;
    

    const profiledata = await userModel.findOne({ email: req.query.email });
    
    if(profiledata.url !== "Empty"){
    const urlArray = profiledata.url.split("/");
    const image = urlArray[urlArray.length - 1];
    const ImageName = image.split(".")[0];
      Cloudinary.uploader.destroy(ImageName, (err, result) => {
        if (err) {
          console.log(err);
        } else {
         res.sendStatus(200);
        }
      });
    }
    

    Cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
       
        await userModel.updateOne(
          { email: req.query.email },
          { url: result.url }
        );
      }
    });
  },
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
      url:req.body.url,
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