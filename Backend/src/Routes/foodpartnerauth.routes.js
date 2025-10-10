import { Router } from "express";
import {registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner} from '../controllers/foodpartner.controller.js'
const router =Router();
router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-partner/logout", logoutFoodPartner);

export default router; 