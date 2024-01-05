
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  url:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  post:{
    type:Array,
  },
  discription:{
    type:String,
  },
  views:{
    type:String,
  },
  followers:{
    type:String,
  },
  visit:{
    type:String,
  },
  connected:{
    type:Array
  },
  followed:{
    type:Array
  },
  request:{
    type:Array,
  },
  invited:{
    type:Array,
  },
  response:{
    type:Array,
  },
  messagebox:{
    type:Array,
    between:{
      type:String,
    },
    message:{
      type:Array
    }
   
  }


});

const userModel = mongoose.model('profile', userSchema);
module.exports = userModel;