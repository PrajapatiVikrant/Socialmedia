const express = require("express");
const bodyParser = require("body-parser");
const userModel = require("../models/profile");
const Cloudinary = require("cloudinary").v2;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


Cloudinary.config({
  cloud_name: "dgedzilok",
  api_key: "654929448899584",
  api_secret: "2szXIiHLrAuTmzU0T6B5B6yx-iw",
});

const post = {
  
 
  
  postUpload: async (req, res) => {
    const file = req.files.Post;
     console.log('hello worldflsjfjfsdfjdsf');
    Cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
       
        await userModel.updateOne(
          { email: req.query.email },
          {
            $push: {
              post: {
                name: result.url,
                post: req.query.discription,
                like: 0,
                liked: [],
                comment: [],
              },
            },
          }
        );
      }
    });
    res.json({
      message:"upload successfully",
    })
  },
  getpost: (req, res) => {
    res.json({
      name: req.body.username,
      email: req.body.email,
      post: req.body.post,
    });
  },

  deletepost: async (req, res) => {
    const urlArray = req.query.postname.split("/");
    const image = urlArray[urlArray.length - 1];
    const ImageName = image.split(".")[0];

    const data = await userModel.findOne({ email: req.query.email });
    const updatedpost = data.post.filter((elem, ind) => {
      return elem.name !== req.query.postname;
    });
    await userModel.updateOne(
      { email: req.query.email },
      { post: updatedpost }
    );
    
    Cloudinary.uploader.destroy(ImageName, (err, result) => {
      if (err) {
        console.log(err);
      } 
    });
    res.send("Post has deleted");
  },
};

module.exports = post;
