import cors from "cors";
import dotenv from "dotenv";
import express from "express";

const app = express();

// Environment Variable Configuration
dotenv.config();

// Import Routes
import moduleRoute from "./routes/module.js";
import articleRoute from "./routes/article.js";
import messageRoute from "./routes/message.js";

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("public/uploads"));

// Route MiddleWare
app.use("/api/module", moduleRoute);
app.use("/api/article", articleRoute);
app.use("/api/message", messageRoute);

// app.listen(8000, () => console.log(`Server is running at http://localhost:8000`));
export default app;

