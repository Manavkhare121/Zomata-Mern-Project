import express, { Router } from "express"
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import {getFoodPartnerById} from "../controllers/foodpartner.controller.js"
const router=Router();
router.get("/:id", getFoodPartnerById);
export default router;