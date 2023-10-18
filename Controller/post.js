const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const post = {
    showpost:(req,res)=>{
        res.sendFile('/config/workspace/'+req.params.email+'/'+req.params.name)
       }
     
}

module.exports = post;