import dotevn from "dotenv"
dotevn.config();


import jwt from "jsonwebtoken"
import { User } from "../models/User.Schema";

export const authMid=async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message:"No authrized"});
    try{
    const verify=jwt.verify(token,process.env.JWT_SECRET);
    if(!verify){
            return res.status(400).json({message:"User does not valid token"});
        }
    req.user=await User.findById(verify.id).select("-password")
    next()
    }catch(error){
        console.log(error);
            return res.status(500).json({message:"Not authrozied in authmiddleware"})
    }
}