//create server
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser" 
import authRoutes from "./Routes/auth.routes.js"
import foodpartnerauthRoutes from "./Routes/foodpartnerauth.routes.js"
import foodRoutes from "./Routes/food.routes.js"
import foodpartnerroutes from "./Routes/food-partner.routes.js"
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);
app.use("/api/authentication", foodpartnerauthRoutes);
app.use("/api/food",foodRoutes);
app.use('/api/food-partner', foodpartnerroutes);


export default app;
