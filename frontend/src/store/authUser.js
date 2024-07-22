import axios from 'axios';
import toast from 'react-hot-toast'
import {create} from 'zustand';

export const useAuthStore = create((set)=>({
  user: null,
  isSignup: false,
  isAuth :  true,
  isLoggedIn: false,
  isLoggingOut: false,
  signup: async(credentials)=>{
    set({isSignup: true})
    try {
      const  response = await axios.post("/api/v1/auth/sign-up",credentials) ;
      set({user: response.data.user,isSignup: false});
      toast.success("account created succeddfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({isSignup: false,user: null});
    }
  },
  login: async(credentials)=>{
    set({isLoggedIn:true})
    try {
      const response = await axios.post('/api/v1/auth/login',credentials);
      set({user: response.data.user,isLoggedIn:false});
      toast.success("logged in ")
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({isLoggedIn: false,user: null});
    }
  },
  logout: async()=>{

    try {
      await axios.post("api/v1/auth/logout");
      set({user:null,isLoggingOut: false});
      toast.success("logged out")
    } catch (error) {
      set({isLoggingOut:false});
     toast.error("an error occured") 
    }
  },
  authCheck: async()=>{
    set({isAuth:true})
    try {
      const response = await axios.get('/api/v1/auth/authCheck');
      set({user: response.data.user,isAuth:false})
    } catch (error) {
      set({isAuth:false,user:null});
    }
  }  
}))