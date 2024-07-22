import dotenv from 'dotenv';
dotenv.config();

export const ENV_VARS = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  API_TMDB: process.env.API_TMDB
}


// store all the environment variables