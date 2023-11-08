const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const comment = {
    addcomment:async (req,res)=>{
        let data = await userModel.findOne({email:req.query.postemail});
        let add  = data.post.filter((elem,ind)=>{
          if(elem.name === req.query.postname){
                        
           elem.comment.push({sender:req.query.sender,message:req.query.message})
          }
          return elem
        })
        const adddata = await userModel.updateOne({email:req.query.postemail},{post:add})
        
        res.send('ok')
    
      },
    
      showcomment:async (req,res)=>{
        let data = await userModel.findOne({email:req.query.postemail});
           data.post.filter((elem,ind)=>{
        
          if(elem.name === req.query.postname){
            
            res.send(elem.comment);
            return 1;
          }
    
        })
       
       
      }
}
module.exports = comment;