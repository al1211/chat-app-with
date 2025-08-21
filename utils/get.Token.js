
import dotevn from "dotenv"
dotevn.config();
import jwt from "jsonwebtoken"


export const genereateToken=(res,userId)=>{
    const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"},)
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:"Strict",
        maxAge:24*60*60*1000
    })
}
