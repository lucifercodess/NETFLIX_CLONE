import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMAGE_URL } from '../utils/contants/Constant';
import { ChevronLeft } from 'lucide-react';

const MovieSlider = ({category}) => {
  const {contentType} = useContentStore();
  const [content, setcontent] = useState([]);

  const formattedCateogiryName = category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1)
  const formattedContentType = contentType === 'movie' ? "Movie" : "Tv Shows"

  useEffect(()=>{
    const getContent = async()=>{
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setcontent(res.data.content);
    }
    getContent();
  },[contentType,category])
  return (
    <div className='text-white bg-black relative px-5 md:px-20' >
      
      <h2 className='mb-4 text-2xl font-bold'>{formattedCateogiryName} {formattedContentType}</h2>
      <div className='flex space-x-4 overflow-x-scroll'>
        {content.map((item)=>(
         <Link to = {`/watch/${item.id}`} className='min-w-[250px] relative group' key = {item.id}>
          <div className='rounded-lg overflow-hidden'>
            <img src={SMALL_IMAGE_URL + item.backdrop_path} alt=""  className=' size-120 transition-transform duration-300 ease-in-out group-hover:scale-125'/>
          </div>
          <p className='mt-2 text-center'>
            {item.title || item.name}
          </p>
         </Link> 
        ))}
      </div>
      
    </div>
  )
}

export default MovieSlider