const mongoose=require("mongoose");
const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },description:{
        type:String,
        require:true
    },status:{
        type:String,//bcz of pending  in process otherwise i use status type bolean
        require:true,
    } ,user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
},{timestamps:true});
const Task=mongoose.model("Task",taskSchema);   
module.exports=Task;