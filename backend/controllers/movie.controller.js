import { fetchFromTMDB } from "../services/movideDatabase.service.js"

export const getTrendingMovies = async(req,res)=>{  // fetches the trending movies
  try {
    const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
    const randomMovie =  data.results[Math.floor(Math.random()*data.results.length)];  // get the random movie

    res.json({success: true, content: randomMovie}); // we return the random movie as an object
  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,message: "internal server error"});
  }
}

export const getMovieTrailers = async(req,res)=>{  // fetches the trailer for the movie by giving in the id field 
  const {id} = req.params // take the id from the params
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
  res.json({success: true, trailers: data.results}); // results because api pe it was results object
  } catch (error) {
    if(error.message.includes('404')){
      return res.status(400).send(null);
    }
    console.log(error.message)
    res.status(500).json({success:false,message: "internal server error"});
  }
}

export const getMovieDetails = async(req,res)=>{  // fetches the movie details

  const {id} = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.json({success:true,details: data});

  } catch (error) {
    if(error.message.includes('404')){
      return res.status(400).send(null);
      
    }
    console.log(error.message)
    res.status(500).json({success:false,message: "internal server error"});
   
  }
}

export const getSimilarMovies = async(req,res)=>{ // fetches similiar movies to binge on
  const {id} = req.params;
  try{
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    res.status(200).json({success:true,similar: data.results});
  }
  catch(error){
    console.log(error.message)
    res.status(500).json({success:false,message: "internal server error"});
  }
}

export const getMoviesByCategory = async(req,res)=>{ // fetches movies by the category you select 
  const{category}  = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    res.status(200).json({success:true,content: data.results});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,message: "internal server error"});
  }
}