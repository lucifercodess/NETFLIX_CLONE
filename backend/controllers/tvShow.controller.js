import { fetchFromTMDB } from "../services/movideDatabase.service.js";

export const getTrendingTvShows = async (req, res) => {
  // fetches the trending tv shows
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const getTvShowTrailers = async (req, res) => {
  // fetches the trailer for the tv shows by giving in the id field
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(400).send(null);
    }
    console.log(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const getTvShowDetails = async (req, res) => {
  // fetches the tv shows details

  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(400).send(null);
    }
    console.log(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const getSimilarTvShow = async (req, res) => {
  // fetches similiar tv shows to binge on
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const getTvShowByCategory = async (req, res) => {
  // fetches tv shows by the category you select
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
