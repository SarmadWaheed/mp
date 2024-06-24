
const User=require('../models/user-models');
const Contact=require('../models/contact-model');
const Service=require('../models/services-model');


const register= async (req,res) => {
 try {
    console.log(req.body);
    const { username, email, phone, password }=req.body;
    
    const userExist=await User.findOne({email});

    if(userExist){
        return res.status(400).json({message:"email already exits"});     
    }

    


    const usercreated=await User.create({ username, email, phone, password});
    res.status(201).json
    ({
    msg:"registration succesfully done",
    token: await usercreated.generateToken() ,
    userId: usercreated._id.toString(),
 });
    
 } catch (error) {
    //res.status(500).json({msg: "server error"});
    next(error);
    
 }


};

const login = async(req,res) =>{

    try {
        const { email, password }=req.body;
        const userExist=await User.findOne({email});
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message:"invalid credentails please register first "}); 
        
        }

        const user=await userExist.comparePassword(password);
         
        if(user){
            res.status(200).json
            ({
            msg:"Login succesfully done",
            token: await userExist.generateToken() ,
            userId: userExist._id.toString(),
         });

        }
        else{
            return res.status(401).json({message:"Invalid email or password"}) ;
        }
        
    } catch (error) {
      
      
        next(error);
        
    }





};

const contactform=async(req,res)=>{
try {
    const response=req.body;
    await Contact.create(response);
  return  res.status(200).json({message:"message send succesfully"});
} catch (error) {
    
   // return res.status(500).json({message:"message not sent"});

   next(error);
}


};

const user=async(req,res) =>{

    try {
        const userdata=req.user;
        
        return res.status(200).json({userdata});
        
    } catch (error) {

        console.log(`error from the user route ${error}`);

        
    }





};


const services=async(req,res)=>{

    try {

        const response=await Service.find();

        if(!response){
            res.status(500).json({message:"no services found"});

            return;
        }
        
        res.status(200).json({data:response});
        
        
    } catch (error) {

        console.log(`error from the service route ${error}`)
        
    }




};






module.exports={register,login,contactform,user,services};