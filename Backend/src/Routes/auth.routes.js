import { Router } from "express";
import { registeruser,loginuser,logoutuser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/user/register", registeruser);
router.post('/user/login',loginuser)
router.get('/user/logout',logoutuser)
export default router;
