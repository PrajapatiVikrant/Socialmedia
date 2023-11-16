const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Config/mydb");
const app = express();
const jwt = require("jsonwebtoken");
const userModel = require("./models/profile");
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const middleware = {
  verifyJWT: async (req, res, next) => {
    const token = req.headers["mytoken"];

    if (!token) {
      res.json({ name: "NOT LOGIN" });
    } else {
      jwt.verify(token, "Coding-learner9580", async (err, decoded) => {
        if (err) {
         
          res.json({ name: "Not login" });
        } else {
          let mydata = await userModel.findOne({ email: decoded.email });
          req.body = mydata;
          next();
        }
      });
    }
  },
  
};
module.exports = middleware;
