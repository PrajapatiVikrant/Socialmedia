const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
require('./Config/mydb')
const userModel = require('./models/profile');
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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
let e;


router.post('/userpost',middleware.verifyJWT,post.postUpload);
router.post('/setimage',middleware.verifyJWT,post.upload);
router.get('/',middleware.verifyJWT,userprofile.getprofiledata)
router.post('/login',auth.login)
router.post('/signup',auth.signup);
router.get('/showpost/:name/:email',post.showpost)
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




router.get('/myimage/:email',(req,res)=>{
  
  res.sendFile('/config/workspace/asset/userfile'+'-'+req.params.email+'.png')

})

module.exports = router;