import mongoose from "mongoose";
import { ENV_VARS } from "./enVars.js";


const connectDb = async()=>{
  try {
    const connection = await mongoose.connect(ENV_VARS.MONGO_URL);
    console.log(`database connected ${connection.connection.host}`)
  } catch (error) {
    process.exit(1) // means there was an error 
    console.log("Error connecting to the database: " + error.message);
  }
} 


export default connectDb;