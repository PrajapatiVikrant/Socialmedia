const express = require('express');
const middleware = require('./Middleware')
const app = express();
const router = express.Router();


//import all api
const auth = require('./Controller/auth');
const comment = require('./Controller/comment');
const connection = require('./Controller/connection');
const like  = require('./Controller/like');
const message = require('./Controller/message');
const post = require("./Controller/post");
const userprofile = require("./Controller/userProfile")


router.post('/userpost',middleware.verifyJWT,post.postUpload);
router.post('/setimage',middleware.verifyJWT,userprofile.uploadPhoto);
router.get('/',middleware.verifyJWT,userprofile.getprofiledata)
router.post('/login',auth.login)
router.post('/signup',auth.signup);
router.get('/showotherprofile',middleware.verifyJWT,userprofile.getprofiledata)
router.get('/getpost',middleware.verifyJWT,post.getpost);
router.post('/visit',userprofile.visit)
router.get('/showvisitprofile/:profile/:email',userprofile.showvisitprofile)
router.put('/myrequest',connection.myrequest)
router.post('/ceateconnection',connection.ceateconnection)
router.get('/showconnection',middleware.verifyJWT,connection.showconnection)
router.post('/sendmessage',message.sendmessage)
router.get('/getmessage/:from/:to',message.getmessage)
router.get('/myprofile',middleware.verifyJWT,userprofile.getprofiledata)
router.get('/myimage/:email',userprofile.profileimage)

router.post('/increaselike',like.increaselike)
router.post('/decreaselike',like.decreaselike)
router.post('/showcomment',comment.showcomment)
router.post('/addcomment',comment.addcomment)
router.delete('/deletepost',post.deletepost)
router.delete('/delete',async(req,res)=>{
   let data = await userModel.deleteOne({email:req.query.email});
   console.log(data);
   res.send(data)
})

router.get('/users', async (req, res) => {
  // Get all users from the database
  const users = await userModel.find({});

  res.json({
    message: 'Users fetched successfully',
    data: users,
  })
});






module.exports = router;