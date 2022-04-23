import express from "express";
const router = express.Router();

import { saveUser } from "../controllers/authController.js";

router.post("/register", saveUser);

export default router;
