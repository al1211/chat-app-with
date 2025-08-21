import dotevn from "dotenv"
dotevn.config()
import mongoose from "mongoose";



export const ConnectDb=async()=>{

    try{
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log("mongoose is connect");

    }catch(err){
        console.log(err);

    }
}

