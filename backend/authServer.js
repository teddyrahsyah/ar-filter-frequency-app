import cors from "cors";
import dotenv from "dotenv";
import express from "express";

const app = express();

// Environment Variable Configuration
dotenv.config();

// Import Routes
import authRoute from "./routes/auth.js";

// Middleware
app.use(cors());
app.use(express.json());

// Route MiddleWare
app.use("/api/user", authRoute);
export default app;