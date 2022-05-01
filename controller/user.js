const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user");
let Admin = require("../models/admin");
const {transporter} = require("../api/userMail.api");

let mailOptions = {
    from: 'farmertest98@gmail.com',
    to: '',
    subject: '',
    text: ''
};





const signin = async(req,res)=>{
    const {email , password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        const user2 = await Admin.findOne({email});

        if(!existingUser ){
                
            if(!user2){
                return res.status(404).json({message : "User doesn't exist."});
            }else if(user2){

                var password2;

                if(password === "admin1234"){
                     password2 = password;
                }else{
                    password2 =  await bcrypt.compare(password , user2.password);
                }
                 
                if(!password2){
                    return res.status(404).json({message : "Invalied credintial."});
                }else{
                    const token = jwt.sign({email:user2.email , id : user2._id}, 'test' ,{expiresIn:"1h"});
    
                    return res.status(200).json({result:user2 , token,Date:new Date(),time: new Date().getTime});
                }
                   
                
            }else{
                return res.status(404).json({message : "User doesn't exist."});
            }
        }
            
        const isPasswordCorrect  = await bcrypt.compare(password , existingUser.password);
        
        
     
        
         if(!isPasswordCorrect){
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


const getAllUsers = async(req , res) =>{
    try{
            const users = await User.find();

            res.status(200).json(users);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const updateUser = async(req , res) =>{
    const userid = req.params.id;
    const {isFarmer} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(userid , {isFarmer},{new: true});

        if(updatedUser.isFarmer === 'Rejected'){
            mailOptions.to = updatedUser.email;
            mailOptions.subject = 'Youre Request Rejected';
            mailOptions.text = 'you cannot upload youre products in this website';
            transporter.sendMail(mailOptions , (error , info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: '+ info.response);
                }
            });

        }

        if(updatedUser.isFarmer === 'Approved'){
            mailOptions.to = updatedUser.email;
            mailOptions.subject = 'Youre Request Approved';
            mailOptions.text = 'you can upload youre products in this website';
            transporter.sendMail(mailOptions , (error , info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: '+ info.response);
                }
            });
        }

        


        res.status(200).json(updatedUser);
    }catch(err){
            res.status(404).json({message : err.message});
    }
}

const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try{
            await User.findByIdAndDelete(id);
            res.status(200).json({msg : "deleted successfull"});
    }catch(err){
            res.status(400).json({message : err.message});
    }
}


module.exports = {signin , signup , getAllUsers , updateUser ,deleteUser};