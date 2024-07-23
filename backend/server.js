import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvShowRoutes from "./routes/tvShow.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/enVars.js";
import connectDb from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();
const PORT = ENV_VARS.PORT; // created a seperate env file where we store env variables

app.use("/api/v1/auth", authRoutes); // v1 as the version used for best pratices whiel developing
app.use("/api/v1/movie",protectRoute, movieRoutes); 
app.use("/api/v1/tv",protectRoute, tvShowRoutes); 
app.use("/api/v1/search",protectRoute, searchRoutes); 
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDb();
});


