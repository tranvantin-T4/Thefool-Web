import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"


//login
const loginUser= async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({email})

    if(!user){
       return res.json({success:false,message:"user Doesn't exsist"})
    }
    const isMatch=await bcrypt.compare(password,user.password); //ss mk
    if(!isMatch){
        return res.json({success:false,message:"Invaild credentials"})
    }

    const token =createToken(user._id);
    res.json({success:true,token})

  } catch (error) {
    console.log(token);
    res.json({success:false,message:"Error"})
    
  }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser= async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,messgae:"User already exists"})
        }
       // validing email format & strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,messgae:"Please enter a valid email"})
        }
      //hashing user password
      const salt=await bcrypt.genSalt(10)//tạo ra một chuỗi salt với độ phức tạp (số lần lặp) là 10.
      const hashedPassword =await bcrypt.hash(password,salt); //bamw mk

      const newUser =new userModel({// tao tk
        name:name,
        email:email,
        password:hashedPassword
      })
      const user=await newUser.save()
      const token= createToken(user._id)
      res.json({success:true,token});

    } catch (error) {
       console.log(error);
       res.json({success:fasle,message:"error"})
       
        
    }
}
export  {loginUser,registerUser}