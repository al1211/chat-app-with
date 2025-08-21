import dotenv from "dotenv"
dotenv.config()
import express from "express"
import {ConnectDb} from "./config/db.js"
import router from "./routes/User.Route.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app =express()
app.use(cors({
    origin:"*",
    }
))
app.use(express.json());
app.use(cookieParser())
ConnectDb();


app.get("/",(req,res)=>{
    res.send("Send url here");
})
app.use("/api/auth",router)

app.listen(process.env.PORT,()=>{
    console.log(`server is runnig ${process.env.PORT}`)
})