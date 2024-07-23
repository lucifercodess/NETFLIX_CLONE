import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/home/HomePage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage'

export default function App() {
  const {user,isAuth,authCheck} = useAuthStore();
  // console.log("user is here ",user);
  
  useEffect(()=>{
    authCheck();
  },[authCheck]);
  if(isAuth){
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 w-10 h-10'/>
        </div>

      </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path='/' element = {<HomePage/>}/>
        <Route path='/signup' element = {!user? <SignUp/> : <Navigate to = {'/'}/>}/>
        <Route path='/login' element = {!user ? <LoginPage/>: <Navigate to = {'/'}/>}/>
        <Route path='/watch/:id' element = {user ? <WatchPage/>: <Navigate to = {'/login'}/>}/>
      </Routes>
      <Toaster/>
      <Footer/>

    </div>
  )
}
