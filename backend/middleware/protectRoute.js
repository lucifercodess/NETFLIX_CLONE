import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV_VARS } from "../config/enVars.js";

export const protectRoute = async(req,res,next)=>{
  try {
    const token = req.cookies['jwt-netflix']; // getting the token from the cookie

    if(!token){
      return res.status(401).json({success:false,message:"unauthorized no token provided"});
    }

    const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET);  // verify the token using jwt.verify

    if(!decoded){
      return res.status(401).json({success:false,message: "invalid token"});
    }

    const user = await User.findById(decoded.userId).select('-password');

    if(!user){
      return res.status(401).json({success:false,message: "user not found "});
    }
    req.user = user; // add user to the request
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success:false,message:"internal server error "});
  }
}