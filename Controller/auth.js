const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/profile");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const secretkey = "Coding-learner9580";


const auth = {
     //sign up api
  signup: async function (req, res) {
     try {
      
      let data = await userModel.findOne({ email: req.query.email });
      if (!data) {
        const passwordhash = await bcrypt.hash(req.query.password, 10);
        const Imageurl = "Empty";
        let data = new userModel({username:req.query.name,url:Imageurl,email:req.query.email,password:passwordhash,views:'15',followers:'5',discription:req.query.discription,visit:req.query.visit})
        const result = await data.save();
        return res.send('success');
      } else {
        return res.send("user already exist");
      }
     } catch (error) {
      res.send(error)
     }
  
  },




  // login api
  login: async function (req, res) {
    let data = await userModel.findOne({ email: req.query.email });
    if (!data) {
      return res.send("Invalid detail");
    } else {
      const passwordmatch = await bcrypt.compare(
        req.query.password,
        data.password
      );
      if (passwordmatch === true) {
        const email = req.query.email;
        const password = req.query.password;
        const data = await jwt.sign(
          { email: email, password: password },
          secretkey,
          { expiresIn: "60m" }
          );

          return res.json({
            message: "login successfully",
            signature: data,
            email:email,
          });
       
        
      } else {
        return res.send({
          message: "wrong password",
          password: passwordmatch,
          right: data.password,
        });
      }
    }
  }
}
module.exports = auth;