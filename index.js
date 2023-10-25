const express = require("express");
require("./Config/mydb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use('/Socialmedia',require("./Route"))


app.listen(4000,()=>{
    console.log('Server listen at 4000 port');
});
