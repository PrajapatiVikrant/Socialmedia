const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Config/mydb");
const app = express();
const jwt = require('jsonwebtoken');
const userModel = require("./models/profile");
const multer = require('multer')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const middleware = {
    verifyJWT:async (req, res, next) => {
        const token = req.headers["mytoken"];
       
       
        if (!token) {
            res.json({name:'NOT LOGIN'});
        } else {
            jwt.verify(token, "Coding-learner9580", async(err, decoded) => {
                if (err) {
                    // console.log(err);
                    res.json({ name: 'Not login'});
                } else {
                             let mydata = await userModel.findOne({email:decoded.email});
                  req.body = mydata;
                  
                    
                    res.json({
                      name:mydata.username,
                      email:mydata.email,
                      views:mydata.views,
                      followers:mydata.followers,
                      post:mydata.post,
                      discription:mydata.discription,
                      visit:mydata.visit,
                      request:mydata.request,
                      invited:mydata.invited,
                      connected:mydata.connected,
                      
                    })
                    next();
                }
            });
        }
      },
      upload:multer({
        storage:multer.diskStorage({
       destination:function(req,file,cb){
           cb(null,"asset");
       },
       filename:function(req,file,cb){
           cb(null,file.fieldname+"-"+req.query.email+".png");
           console.log(file.fieldname+"-"+req.query.email+".png")
           console.log(req.query)
             
         
       }
        })
      }).single('userfile'),
      
     
     
    

      postUpload:multer({
        storage:multer.diskStorage({
       destination:function(req,file,cb){
           cb(null,req.query.email);
       },
       filename:async function(req,file,cb){
           let r = Math.random();
           cb(null,file.fieldname+"-"+r+".png");
           console.log(file.fieldname+"-"+r+".png")
           let data = await userModel.updateOne({email: req.query.email}, { $push: { post: {name:'Post-'+r+'.png',post:req.query.discription,like:0,liked:[],comment:[]} } });
          
       
         
       }
        })
      }).single('Post'),
   
     
}
module.exports = middleware;