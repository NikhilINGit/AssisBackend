const jwt=require('jsonwebtoken');
const User=require('../model/userModel');
exports.verifyToken=verifyToken;

async function verifyToken (req, res, next)  {
    const secret=process.env.JSON_SECRET
    let token = req.headers['authorization'];
    console.log("token : ",token);
  
    if (!token) {
        console.log(token)
      return res.status(403).send({ message: "access token not available!", isUnauthorized: true });
    }

    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        
        return res.status(401).send({ message: "Unauthorized access!", isUnauthorized: true });
      }
      req.userId = decode.userId;
      next();
    })
  
  };
