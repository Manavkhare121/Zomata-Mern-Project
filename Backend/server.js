//start server
// server.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./src/db/db.js";
import app from "./src/app.js";

console.log("IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed !!!", error.message);
  });
