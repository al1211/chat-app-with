
import bcrypt from "bcryptjs"
    import { User } from "../models/User.Schema.js";
import { genereateToken } from "../utils/get.Token.js";





export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // ✅ Send token + user data
    const token = genereateToken(user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

  } catch (error) {
    console.error("RegisterUser error:", error.message);
    return res.status(500).json({ message: "RegisterUser error" });
  }
};




export const loginUser=async(req,res)=>{
    try{
     const {email,password}=req.body;
     if(!email || !password){
        res.status(400).json({message:"please enter email and password"})
     }
     const exituser=await User.findOne({email})
     if(!exituser){
        res.status(401).json({message:"User not found"});
     }
    const comparePassword=await bcrypt.compare(password,exituser.password);
    if(!comparePassword){
        res.status(401).json({message:"Invalid email and apssword"})
    }else{
        genereateToken(res,exituser._id);
        
    }
     res.status(201).json({message:"succesful login"});
    }catch(error){
        console.log(err);
        res.status(500).json({message:"login error"})

    }
}