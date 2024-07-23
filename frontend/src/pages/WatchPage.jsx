import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';

function formatReleaseDate(date){
  return new Date(date).toLocaleDateString("en-US",{
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}
const WatchPage = () => {
  const {id} = useParams();
  const [trailers,setTrailers] = useState([]);
  const [currTrailerIdx,setCurrTrailerIdx] = useState(0);
  const [loading, setloading] = useState(true);
  const [contentDetails, setcontentDetails] = useState({});
  const[similarContent,setSimilarContent] = useState([]);
  const {contentType} = useContentStore();

  useEffect(()=>{
    const getTrailer = async()=>{
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
      setTrailers(res.data.trailers)
      } catch (error) {
        if(error.message.includes('404')){
          console.log("no trailers found");
          setTrailers([]);
        }
      }
    } 
    getTrailer();
  },[contentType,id])

  useEffect(()=>{
    const getSimilarContent = async()=>{
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`)
        setSimilarContent(res.data.similar)
      } catch (error) {
        if(error.message.includes('404')){
          console.log("no trailers found");
          setTrailers([]);
        }
      }
    } 
    getSimilarContent();
  },[contentType,id])

  useEffect(()=>{
    const getContentDetails = async()=>{
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`)
        setcontentDetails(res.data.content)
      } catch (error) {
        if(error.message.includes('404')){
          console.log("no trailers found");
          setcontentDetails(null);
        }
      }
      finally{
        setloading(false);
      }
    } 
    getContentDetails();
  },[contentType,id])

  const handleNext = ()=>{
    if(currTrailerIdx !== trailers.length-1){
      setCurrTrailerIdx(currTrailerIdx + 1);
    }
    
  }
  const handlePrev = ()=>{
    if(currTrailerIdx > 0){
      setCurrTrailerIdx(currTrailerIdx - 1);
    }
    
  }
return (
    <div className='bg-black min-h-screen text-white '>
     <div className='mx-auto container px-4 py-8 h-full '>
      <Navbar/>
      {trailers.length > 0 && (
        <div className='flex justify-between items-center mb-4'>
          <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currTrailerIdx === 0 ? 'cursor-not-allowed opacity-50': " "}`} disabled = {currTrailerIdx === 0}>
            <ChevronLeft size={24} onClick={handlePrev}/>
          </button>

          <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currTrailerIdx === trailers.length-1 ? 'cursor-not-allowed opacity-50': " "}`} disabled = {currTrailerIdx === trailers.length-1}>
            <ChevronRight size={24} onClick={handleNext}/>
          </button>
        </div>
      )}
      <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32 '>
        {trailers.length > 0 &&(
          <ReactPlayer controls = {true} width={"100%"} height={"70vh"} className = "mx-auto rounded-lg overflow-hidden" 
          url = {`https://www.youtube.com/watch?v=${trailers[currTrailerIdx].key}`}/>
        )}
      </div>
      {/* <div className='flex flex-col md:flex-row items-center justify-between gap-20 mx-auto max-w-6xl'>
        <div className='mb-4 md:mb-0'>
          <h2 className='font-bold text-5xl text-balance '>{content?.title || content?.name}</h2>

          <p className='mt-2 text-lg'>
            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
            {content?.adult ? (
              <span className='text-red-600'>18+</span>
            ):(
              <span className='text-green-700'>PG-13</span>
            )}
          </p>
          <p className='mt-4 text-lg'>{content?.overview}</p>
        </div>
      </div> */}
      </div> 
    </div>
  )
}

export default WatchPage