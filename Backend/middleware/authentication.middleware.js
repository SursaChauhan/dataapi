const jwt =require("jsonwebtoken");

const authentication =(req,res,next)=>{
const token = req.headers.authorization

if(!token){
    return res.send("login first ")
}
jwt.verify(token, 'loginsecret', function(err, decoded) {
    console.log(decoded); // bar
    if(decoded){
      const userID =decoded.userID;
      req.userID =userID;
      console.log("userID form auth",userID);
      next();
    }
  });
}
module.exports ={authentication};