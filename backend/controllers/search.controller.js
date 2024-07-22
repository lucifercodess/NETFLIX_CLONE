import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/movideDatabase.service.js"

 
// in every contrller function we use req.user this is nothing but the user we passed in the protect route middlware
// and the user info was stored in req.user
export const searchPerson = async(req,res)=>{ // search the person
  const{query} = req.params
  try{
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
    
    if(response.results.length === 0){
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id,{  // when you search we push or add yoursearch to the search history
      $push:{
        searchHistory:{
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date() 
        }
      }
    })
    res.status(200).json({success: true,content: response.results});
  }
  catch(error){
    console.log(error.message);
    res.status(500).json({success:false,message:"internal server error"});
  }
}

export const searchMovie = async(req,res)=>{
  const{query} = req.params
  try{
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
    
    if(response.status.length === 0){
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id,{
      $push:{
        searchHistory:{
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        }
      }
    })
    res.status(200).json({success: true,content: response.results});
  }
  catch(error){
    console.log(error.message);
    res.status(500).json({success:false,message:"internal server error"});
  }
}

export const searchTvShow = async(req,res)=>{
  const{query} = req.params;
  try{
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
    
    if(response.status.length === 0){
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id,{
      $push:{
        searchHistory:{
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "tv",
          createdAt: new Date(),
        }
      }
    })
    res.status(200).json({success: true,content: response.results});
  }
  catch(error){
    console.log(error.message);
    res.status(500).json({success:false,message:"internal server error"});
  }
}

export const searchHistory = async(req,res)=>{
  try {
    res.status(200).json({success:true, content: req.user.searchHistory}) // we already have the user in the req.user
  } catch (error) {
    console.log("error in the search history controller" + error.message);
    res.status(500).json({success:false,message: "internal server error"});
  }
}

export const removeItemFromSearchHistory = async(req,res)=>{
  let {id} = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id,{
      $pull:{ // pull means to delete or pop an item because search history is an array
        searchHistory: {
          id:id
        }
      }
    })
    res.status(200).json({success:true, message: "item removed from search history"})
  } catch (error) {
    res.status(500).json({success:false,message: "internal server error"});
  }

}