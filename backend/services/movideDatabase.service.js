import axios from "axios";
import { ENV_VARS } from "../config/enVars.js";


  export const fetchFromTMDB = async(url)=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ENV_VARS.API_TMDB
      }
    };


    const response = await axios.get(url,options);
    if(response.status !== 200){
      console.log("failed to fetch from the database")
    }
    return response.data; 
  }

  // this will serve as the template to send request to the TMDB api