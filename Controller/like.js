const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const like = {
    increaselike:async(req,res)=>{
        let data = await userModel.findOne({email:req.query.postemail});
        console.log(req.query)
        let like  = data.post.filter((elem,ind)=>{
          if(elem.name === req.query.postname){
            elem.like += 1;
            elem.liked.push(req.query.email)
          }
          return elem
        })
        console.log(like)
        const addlike = await userModel.updateOne({email:req.query.postemail},{post:like})
        console.log(addlike);
        res.send('hi')
        },
        
        decreaselike:async(req,res)=>{
          let data = await userModel.findOne({email:req.query.postemail});
          let like  = data.post.filter((elem,ind)=>{
            if(elem.name === req.query.postname){
              elem.like -= 1;
              elem.liked = elem.liked.filter((elem,ind)=>{
                return elem !== req.query.email
              })
            }
            return elem
          })
          console.log(like)
          const addlike = await userModel.updateOne({email:req.query.postemail},{post:like})
          console.log(addlike);
          res.send('hi')
          }
}
module.exports = like;