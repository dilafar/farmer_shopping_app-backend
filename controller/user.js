const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user");


const signin = async(req,res)=>{
    const {email , password} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(!existingUser ){
           
                return res.status(404).json({message : "User doesn't exist."});
        }
        
       const isPasswordCorrect = await bcrypt.compare(password , existingUser.password);
        
       if(!isPasswordCorrect ){
            return res.status(404).json({message : "Invalied credintial."});
        }
    
        
            const token = jwt.sign({email:existingUser.email , id : existingUser._id}, 'test' ,{expiresIn:"1h"});
    
            return res.status(200).json({result:existingUser , token, time:new Date().toLocaleTimeString(), date: new Date().toLocaleDateString()});
      
       
    
    }catch(error){
                res.status(500).json({message: 'something went wrong.'});
    }
}
    



const signup = async(req,res)=>{
    var {firstName , lastName , email , Phone ,address ,password , confirmpassword} = req.body;
    
    try{
            const existingUser2 = await User.findOne({email});
            if(existingUser2){
               return  res.status(400).json({message : "user already exists."});
            }
            
            if(password !== confirmpassword){
                return res.status(400).json({message : "password don't match."}); 
            }

            const hashedPassword = await bcrypt.hash(password,12);
            const user = {
                firstName , lastName ,  email ,Phone ,address, password : hashedPassword 
            }
            const result = await User.create(user);
            const token = jwt.sign({email: result.email, id: result._id}, 'test' ,{expiresIn:"1h"});
            res.status(200).json({result , token});
    }catch(error){
        res.status(500).json({message: 'something went wrong.'});
    }
}


module.exports = {signin , signup};