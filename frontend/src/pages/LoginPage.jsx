import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login} = useAuthStore();
  const handleLogin = (e)=>{
    e.preventDefault();
    login({email,password})
  }
  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
          <Link to = {'/'}>
            <img src="netflix-logo.png" className= "w-25 h-20"alt="logo" />
          </Link>
      </header>
      <div className='flex justify-center items-center mx-3 mt-20'>
          <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
            <h1 className='text-center text-white text-2xl font-bold mb-4'>
              Login
            </h1>
            <form className='space-y-4 ' onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>Email</label>
                <input type="email" name="email" placeholder='you@example.com' id= "email" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus: outline-none focus: ring'  value = {email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>password</label>
                <input type="password" name="password" placeholder='****' id= "password" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus: outline-none focus: ring'  value = {password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <button className='w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-800'>Sign Up</button>
            </form>
            <div className='text-center text-gray-400 '>
                Not a Member?{" "}
                <Link to = {"/signup"} className = "text-red-500 hover:underline">
                  Sign up</Link> 
            </div>
          </div>
      </div>
    </div>
  )
}

export default LoginPage