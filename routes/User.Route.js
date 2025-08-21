import express from "express"
import { loginUser, RegisterUser } from "../controller/User.controller.js";
const router=express.Router();

router.post("/register",RegisterUser);
router.post("/login",loginUser)


export default router;



