const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,require:true
    },
    password:{
        type:String,require:true
    },status:{
      type:Boolean,
      default:true
    },
    userName:{
        type:String
    },
    

},{timestamps:true});


const user = new mongoose.model('user',userSchema);
module.exports = user;