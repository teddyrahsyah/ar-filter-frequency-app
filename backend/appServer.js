import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./config/dbConfig.js";

const app = express();

// Environment Variable Configuration
dotenv.config();

// DB Connection
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("AppServer: Arsim Database Connected..."));

// Import Routes
import moduleRoute from "./routes/module.js";
import articleRoute from "./routes/article.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public/uploads"));

// Route MiddleWare
app.use("/api/module", moduleRoute);
app.use("/api/article", articleRoute);

// app.listen(8000, () => console.log(`Server is running at http://localhost:8000`));
export default app;

