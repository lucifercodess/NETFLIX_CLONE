import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/enVars.js';

export const genTokenAndSetCookie = (userId,res)=>{
  const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn: "15d"});

  res.cookie("jwt-netflix",token,{
    maxAge: 15*24*60*60*1000, // expires in 15 days 
    httpOnly: true,// only accessible via browser // XSS attacks are prevented
    sameSite: "Strict",
    secure: ENV_VARS.NODE_ENV !== "development"
  })

  return token;
}