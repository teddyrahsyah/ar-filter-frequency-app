import express from "express";
const router = express.Router();

import { createLecture } from "../controllers/lectureController.js";

router.post("/create", createLecture);

export default router;
