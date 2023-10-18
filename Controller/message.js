const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const message = {


    //to send user message to another user
    sendmessage: async(req,res)=>{
 
        let data = await userModel.updateOne(
          { "email":req.query.from, "messagebox.between": req.query.from+'&'+req.query.to },
          {
              $push: {
                         
                "messagebox.$.message": {email:req.query.from,message:req.query.message},
               }
          }
        )
        
        let data2 = await userModel.updateOne(
          { "email":req.query.to, "messagebox.between": req.query.to+'&'+req.query.from },
          {
              $push: {
                         
                "messagebox.$.message": {email:req.query.from,message:req.query.message},
               }
          }
        )
       console.log(data2)
        res.send('ho gya');
      
      },



      //get user message
      getmessage:async(req,res)=>{
  
        const data = await userModel.findOne({email:req.params.from});
       
        let message = data.messagebox.filter((elem,ind)=>{
          return elem.between === req.params.from+'&'+req.params.to;
        })
       
       res.json(
        message,
       )
       
      
      },
}
module.exports = message;