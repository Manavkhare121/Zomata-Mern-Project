//start server
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import app from "./src/app.js";

dotenv.config({ path: "./.env" });

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

