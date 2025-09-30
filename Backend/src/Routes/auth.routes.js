import { Router } from "express";
import { registeruser,loginuser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/user/register", registeruser);
router.post('/user/login',loginuser)

export default router;
