// src/routes/food.routes.js
import { Router } from "express";
import { createFood } from "../controllers/food.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // store in memory

// POST /food -> upload single file with field name "video"
router.post("/", authmiddleware, upload.single("video"), createFood);

export default router;
