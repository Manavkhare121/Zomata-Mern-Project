import { Router } from "express";
import  {createFood } from '../controllers/food.controller.js'
import authmiddleware from '../middlewares/auth.middleware.js'
const router=Router();



export default router