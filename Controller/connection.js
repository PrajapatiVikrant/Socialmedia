const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





const connection = {
    //get request
myrequest:async(req,res)=>{
    let data1 = await userModel.updateOne({email: req.query.to}, { $push: { request: req.query.from } });
    let data2 = await userModel.updateOne({email:req.query.from},{$push: {invited:req.query.to}});
    let data3 = await userModel.updateOne({email:req.query.to},{$push: {response:{email:req.query.from,connection:'connecting'}}})
    let data4 = await userModel.updateOne({email:req.query.from},{$push: {response:{email:req.query.to,connection:'connecting'}}})
  
  
  
    res.send('connecting');
},



//create new connection
ceateconnection: async(req,res)=>{
   
    let freindreq = req.query.freindreq.split(',');
   
    let data1 = await userModel.updateOne(
      { email:req.query.link, "response.email": req.query.from },
      {
          $set: {
                     
            "response.$.connection": "connected",
           }
      }
  )
  let data = await userModel.updateOne({email: req.query.from}, {request:freindreq});
  let data0 = await userModel.updateOne({email: req.query.link}, {invited:freindreq});
  
  
  
  let data2 = await userModel.updateOne(
    { "email":req.query.from, "response.email": req.query.link },
    {
        $set: {
                   
          "response.$.connection": "connected",
         }
    }
  )
  
  let data3 = await userModel.updateOne({email:req.query.link},{$push: {connected:{email:req.query.from}}})
  let data4 = await userModel.updateOne({email:req.query.from},{$push: {connected:{email:req.query.link}}})
  let data5 = await userModel.updateOne({email:req.query.from},{$push: {messagebox:{between:req.query.from+'&'+req.query.link,message:[]}}})
  let data6 = await userModel.updateOne({email:req.query.link},{$push: {messagebox:{between:req.query.link+'&'+req.query.from,message:[]}}})
  
  
  res.send('success')
  },
  showconnection:(req,res)=>{
    res.json({
      connected: req.body.connected,
    })
  }
  
  

}

module.exports = connection;