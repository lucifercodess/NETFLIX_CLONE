import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ChevronRight} from 'lucide-react';

const AuthScreen = () => {
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const handleAuthScreenSubmit= (e)=>{
    e.preventDefault();
    navigate('/signup?email=' + email);
  }
  return (
    <div className='hero-bg relative '>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
        <img src="/netflix-logo.png" alt="NetFLix logo " className='w-32 md:w-52 cursor-pointer' />
        <Link to = {'/login' } className='text-white bg-red-600 py-1 px-2 rounded'>
          Sign In
        </Link>
      </header>

      <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-4 md:text-6xl'>Unlimited Movies,Tv Shows and More</h1>
        <p className='text-lg mb-4'>Watch Anytime Anywhere</p>
        <p className='mb-4'>Ready to Watch? Enter your email to create or restart your membership at Netflix</p>

        <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleAuthScreenSubmit}>
        <input type="email" name="email" placeholder='you@example.com' className='p-2 rounded flex-1 bg-black/80 border border-gray-700'  value = {email} onChange={(e)=>setEmail(e.target.value)}/>

        <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
          Get Started
          <ChevronRight className = "size-8 md:size-10"/>
        </button>
        </form>
      </div>
      
      {/*seperater component*/}

      <div className='h-4 w-full bg-[#232323]' aria-hidden = 'true'/>

      {/*first  section*/}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-3'>
          {/*left  side*/}
          <div className='flex-1 text-center md:text-left '>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your tv</h2>
            <p className='text-lg md:text-xl'>Watch on Smart Tvs, PlayStations, Chromecast, Appletv, blu-ray players and more</p>
          </div>
          {/*right  side*/}
          <div className='flex-1 relative'>
            <img src="/tv.png" alt="tv" className='mt-4 z-20 relative' />
            <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
            playsInline
            autoPlay= {true}
            muted
            loop>
              <source src = "/hero-vid.m4v"  type='video/mp4'/>
            </video>
          </div>
        </div>   
      </div>
      <div className='h-4 w-full bg-[#232323]' aria-hidden = 'true'/>
      {/*second  section*/}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-3'>
          {/* left side*/ }
          <div className='flex-1'>
            <div className='relative'>
              <img src="/stranger-things-lg.png" alt="Stranger things image" className='mt-4' />
              <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-mg p-2' >
                <img src="/stranger-things-sm.png" alt="" className='h-full'/>
                <div className='flex justify-between items-center w-full '>
                  <div className='flex-col flex gap-0'>
                      <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                      <span className='text-sm text-blue-500 '>Downloading...</span>
                  </div>
                  <img src="/download-icon.gif" alt="" className='h-12'/>
                </div>
              </div>

            </div>
          </div>
          <div className='flex-1 md:text-left text-center'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Download Movies and Tv Shows to Watch offline</h2>
            <p className='text-lg md:text-xl'>Save your favourites easily and always have something to watch </p>
          </div>
        </div>
      </div>

      <div className='h-4 w-full bg-[#232323]' aria-hidden = 'true'/>
      {/* third seciton*/}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl  mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-3'>
          {/*left  side*/}
          <div className='flex-1 text-center md:text-left '>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch EveryWhere</h2>
            <p className='text-lg md:text-xl'>Stream Unlimited Movies and TvShows on your phone tablet laptop and tv</p>
          </div>
          {/*right  side*/}
          <div className='flex-1 relative overflow-hidden'>
            <img src="/device-pile.png" alt="device" className='mt-4 z-20 relative' />
            <video className='absolute top-2 left-1/2 -translate-x-1/2 z-10 max-w-[63%] h-4/6'
            playsInline
            autoPlay= {true}
            muted
            loop>
              <source src = "/video-devices.m4v"  type='video/mp4'/>
            </video>
          </div>
        </div>   
      </div>
      <div className='h-4 w-full bg-[#232323]' aria-hidden = 'true'/>
      {/*fourth section*/}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center flex-col-reverse md:flex-row justify-between px-4 md:px-2'>
          <div className='flex-1 relative'>
            <img src="/kids.png" alt=""  className='mt-4'/>
          </div>
          {/*right */}
          <div className='flex-1 text-center md:text-left'>
              <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Create profile for kids</h2>
              <p className='text-lg md:text-xl'>Sends kids on adventure with their favourite characters in a space made just for them-free with your membership</p>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default AuthScreen