import express from "express";
const router = express.Router();

import { register, login, refreshingToken, logout } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/token", refreshingToken);
router.delete("/:token/logout", logout);

export default router;
