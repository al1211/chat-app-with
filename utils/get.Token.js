
import dotevn from "dotenv"
dotevn.config();
import jwt from "jsonwebtoken"


export const genereateToken=(res,userId)=>{
    console.log("gern token is calling")
    const token=jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"},)
     return token;
}
