import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { genTokenAndSetCookie } from "../utils/genToken.js";


export const loginController = async (req,res) => {
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({success: false,message: "please fill all the fields"})
    }
    const user = await User.findOne({email: email})
    if(!user){
      return res.status(400).json({success: false,message: "email invalid"})
    }
    const isPasswordCorrect = await bcryptjs.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({success: false,message: "incorrect password"})
    }
    genTokenAndSetCookie(user._id,res);
    res.status(200).json({
      success: true,
        user: {
          ...user._doc,
          password: " ",
        },
    })
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const signupController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/; // regular expression to check if the eamil is valid or not
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a valid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "password should be atleast 6 characters",
        });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      res.status(400).json({ success: false, message: "email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      res
        .status(400)
        .json({ success: false, message: "username already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]; // static from the public folder from front end
    const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)]; // gives the random image index
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });
    if (newUser) { // you could also skip this if block because user will be created reagardless
      genTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        success: true,
        user: {
          ...newUser._doc,
          password: " ",
        },
      });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie('jwt-netflix'); // simply we just clear the cookie and log out the user
    res.status(200).json({success:true,message: "logged out sucessfully"})
  } catch (error) {
    console.log("error in logout controller", error.message)
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const authCheck = async(req,res)=>{
  try {
    console.log(req.user);
    res.status(200).json({success:true,user:req.user})
  } catch (error) {
    console.log("error in authcheck controller",error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}
