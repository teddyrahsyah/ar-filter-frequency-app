import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./config/dbConfig.js";

const app = express();

// Environment Variable Configuration
dotenv.config();

// DB Connection
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Arsim Database Connected..."));

// Import Routes
import authRoute from "./routes/auth.js";
import lectureRoute from "./routes/lecture.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));

// Route MiddleWare
app.use("/api/user", authRoute);
app.use("/api/lecture", lectureRoute);

app.listen(8000, () =>
	console.log(`Server is running at http://localhost:8000 ${path.join(path.resolve(), "public", "uploads")}`)
);
