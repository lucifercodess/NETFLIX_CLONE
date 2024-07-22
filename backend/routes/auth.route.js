import express from "express";
import { authCheck, loginController, logoutController, signupController } from "../controllers/auth.controller.js";
import {protectRoute} from '../middleware/protectRoute.js'
const router = express.Router();

router.post('/login',loginController)
router.post('/sign-up',signupController)
router.post('/logout',logoutController)
router.get('/authCheck',protectRoute,authCheck)




export default router