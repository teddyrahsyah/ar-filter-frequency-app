import path from "path";
import dotenv from "dotenv";
import db from "./config/dbConfig.js";

const app = express();

// Environment Variable Configuration
dotenv.config();

// DB Connection
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Arsim Database Connected..."));

// Import Routes
import authRoute from "./routes/auth.js";
import moduleRoute from "./routes/module.js";
import articleRoute from "./routes/article.js";
import messageRoute from "./routes/message.js";

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("public/uploads"));

// Route MiddleWare
app.use("/api/user", authRoute);
app.use("/api/module", moduleRoute);
app.use("/api/article", articleRoute);
app.use("/api/message", messageRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', "build", "index.html"))
  })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));