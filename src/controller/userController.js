const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const response = require("../helper/responseHelper");
const jwt=require('jsonwebtoken');
const Task = require("../model/taskModel");
const saltRounds = 10;
exports.register = register;
exports.loginReq=loginReq;
exports.verifyToken=verifyToken;
exports.addTask=addTask;
exports.allTask=allTask;
exports.deleteTask=deleteTask;
exports.getTaskById=getTaskById;
exports.updateTask=updateTask;
exports.test=test;
 function test(req,res){
  response.userResponse(res, "Task updated successfully", {});
res.send("fucntion runn seccesfully");
}
 async function updateTask(req, res)  {
  try {
    const { id } = req.params; 
    const { title, description, status } = req.body; 

    console.log("Updating task:", id);

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true } 
    );

    if (!task) {
      return response.negativeResponce(res, "Task not found", {});
    }

    response.userResponse(res, "Task updated successfully", task);
  } catch (error) {
    console.error("Error updating task:", error);
    response.negativeResponce(res, "Task update failed", {});
  }
};
async function getTaskById (req, res) {
  try {
    const { id } = req.params; 

    console.log("Fetching task:", id);

    const task = await Task.findById(id).populate("user_id", "userName");

    if (!task) {
      return response.negativeResponce(res, "Task not found", {});
    }

    response.userResponse(res, "Task fetched successfully", task);
  } catch (error) {
    console.error("Error fetching task:", error);
    response.negativeResponce(res, "Task fetch failed", {});
  }
};
async function deleteTask(req,res){
  try {
    const { id } = req.params;
    console.log(  id)
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      response.negativeResponce(res, "TAsk not found", {});
    }

    response.userResponse(res, "Task deleted", {});
  } catch (error) {
    console.error("Error deleting task:", error);
    response.negativeResponce(res, "TAsk error", {});
  }
}
async function allTask(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments();
    const allTask = await Task.find()
      .populate({
        path: "user_id",
        select: { userName: 1 },
      })
      .skip(skip)
      .limit(limit);

    response.userResponse(res, "All tasks retrieved", {
      tasks: allTask,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error,"error")
    response.negativeResponce(res, "All task error", {});
  }
}
async function addTask(req,res){
  try {
    var { title, description, status,
    } = req.body;
   var checkTask = await Task.findOne({ title:title });
  
   if (!checkTask) {
       var taskObj = new Task({});
       taskObj.title = title;
       taskObj.description = description;
       taskObj.status = status;
    taskObj.user_id=req.userId;
       await taskObj.save();
       response.userResponse(res, "Task created succesfully", taskObj);
     } else {
       response.negativeResponce(res, "Task already exist", {});
     }
   
  } catch (error) {
    res.status(500).json({ success: false, message: "task not added" });
  }
}
async function verifyToken(req,res){
  try {
    // res.json({
    //   success: true,
    //   message: "User authenticated successfully",
    //   data: { ok: true },
    // });
    response.userResponse(res, "User Authetiocation Succesfully", {ok:true});
  } catch (error) {
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
}
async function loginReq(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.negativeResponce(res, "User not found", {});
      } 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return response.negativeResponce(res, "Invalid password", {});
        } else {
          const secretKey = process.env.JSON_SECRET
          const token = jwt.sign({ userId: user.id }, secretKey);
          response.userResponse(res, "userLogin Succesfully", {
            token: token,
            user:user,
          });
        }
    
    } catch (error) {
      console.log("error are in loginReq function : ", error);
      response.negativeResponce(res, "error", {});
    }
  }
async function register(req, res) {
    try {
      var { userName, email, password,
       } = req.body;
      var checkuser = await User.findOne({ email });
     
      if (!checkuser) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (checkuser == null) {
          var userObj = new User({});
          userObj.email = email;
          userObj.password = hashedPassword;
          userObj.userName = userName;
     
          await userObj.save();
          response.userResponse(res, "user are registered", userObj);
        } else {
          response.negativeResponce(res, "user already exist", {});
        }
      } else {
        response.negativeResponce(res, "already registered", checkuser);
      }
    } catch (error) {
      console.log("error in register function ", error);
      response.negativeResponce(res, "error", {});
    }
  }
  