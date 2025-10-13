// src/routes/food.routes.js
import { Router } from "express";
import { createFood ,getFoodItems,likeFood,saveFood} from "../controllers/food.controller.js";
import {authFoodPartnerMiddleware,authUserMiddleware} from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // store in memory

// POST /food -> upload single file with field name "video"
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);


router.get("/",authUserMiddleware,getFoodItems)
router.post("/", createFood);
router.post('/like',authUserMiddleware,likeFood)
router.post("/save",authUserMiddleware,saveFood)



export default router;
