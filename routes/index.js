var express = require('express');
var router = express.Router();
var UserController=require("../src/controller/userController");
const check=require("../src/config/authJWT");

router.post('/register',UserController.register);
router.post('/login',UserController.loginReq);
router.get('/verifyToken',check.verifyToken,UserController.verifyToken);
router.post('/addTask',check.verifyToken,UserController.addTask);
router.get("/allTask",check.verifyToken,UserController.allTask);
router.get("/task/:id",check.verifyToken,UserController.getTaskById);
router.delete("/deleteTask/:id",check.verifyToken,UserController.deleteTask);
router.put("/task/update/:id",check.verifyToken,UserController.updateTask);
module.exports = router;
