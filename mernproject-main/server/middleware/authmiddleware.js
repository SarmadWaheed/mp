
const jwt=require("jsonwebtoken");
const User=require("../models/user-models");


const authmiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");

    if(!token) {
        //if you use expire token 
        return res.status(401).json({msg:"unauthorized token"});
    }

    //assume token is in format ,bearer ,removing the bearer prefix


const jwtToken=token.replace("Bearer","").trim();

try {

    const isVerifed=jwt.verify(jwtToken,process.env.JWT_secret_key);
    
    // this statement is actually getting whole data by finding email
    // and also removing the password value 

    const userdata=await User.findOne({email:isVerifed.email}).select({
        
       password:0,
    });
   // creation our custom properties
    req.user=userdata;
    req.token=token;
    req.userID=userdata._id;

 // Move on to the next middleware or route handler
    next();
    
} catch (error) {
    return res.status(401).json({msg:"unauthorized token"});

    
}







};

module.exports=authmiddleware;