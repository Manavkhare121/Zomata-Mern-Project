import { Router } from "express";
import {registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner} from '../controllers/foodpartner.controller.js'
const router =Router();
router.post("/foodpartner/register", registerFoodPartner);
router.post("/foodpartner/login", loginFoodPartner);
router.get("/foodpartner/logout", logoutFoodPartner);

export default router;