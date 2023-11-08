const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const multer = require("multer");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const post = {
  showpost: (req, res) => {
    res.sendFile(
      "/config/workspace/" + req.params.email + "/" + req.params.name
    );
  },
  upload: multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "asset");
      },
      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname +
            "-" +
            req.query.email +
            path.extname(file.originalname)
        );
    
      },
    }),
  }).single("userfile"),
  postUpload: multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, req.query.email);
      },
      filename: async function (req, file, cb) {
        let r = Math.random();
        cb(null, file.fieldname + "-" + r + path.extname(file.originalname));
        await userModel.updateOne(
          { email: req.query.email },
          {
            $push: {
              post: {
                name: "Post-" + r + path.extname(file.originalname),
                post: req.query.discription,
                like: 0,
                liked: [],
                comment: [],
              },
            },
          }
        );
      },
    }),
  }).single("Post"),
  getpost:(req,res)=>{
    res.json({
        name: req.body.username,
        email: req.body.email,
        post: req.body.post,
      }); 
  },

  deletepost: async (req, res) => {
    console.log(req.query.email + "\n" + req.query.postname);
    const data = await userModel.findOne({ email: req.query.email });
    const updatedpost = data.post.filter((elem, ind) => {
      return elem.name !== req.query.postname;
    });
    await userModel.updateOne(
      { email: req.query.email },
      { post: updatedpost }
    );
    fs.unlinkSync(`${req.query.email}/${req.query.postname}`);
    res.send("Post has deleted");
  },
};

module.exports = post;
