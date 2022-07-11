import dotenv from "dotenv";
import db from "./config/dbConfig.js";
import appServer from "./appServer.js";
import authServer from "./authServer.js";

// Environment Variable Configuration
dotenv.config();

// DB Connection
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Arsim Database Connected..."));

appServer.listen(process.env.PORT, () => {
  console.log(`App Server is running at http://localhost:${process.env.PORT || 8000}`);
})

authServer.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(`Auth Server is running at http://localhost:${process.env.AUTH_SERVER_PORT || 8010}`);
});