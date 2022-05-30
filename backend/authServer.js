import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./config/dbConfig.js";

const app = express();

// Environment Variable Configuration
dotenv.config();

// DB Connection
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("AuthServer: Arsim Database Connected..."));

// Import Routes
import authRoute from "./routes/auth.js";

// Middleware
app.use(cors());
app.use(express.json());

// Route MiddleWare
app.use("/api/user", authRoute);
export default app;