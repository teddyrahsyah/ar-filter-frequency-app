import cors from "cors";
import express from "express";
import db from "./config/dbConfig.js";

const app = express();

// DB Connection
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Arsim Database Connected..."));

app.use(cors());
app.use(express.json());

app.listen(8000, () => console.log(`Server is running at http://localhost:8000`));
