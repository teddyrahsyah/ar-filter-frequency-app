import express from "express";
const router = express.Router();

import { upload } from "../middleware/uploadImage.js";
import { verifyUser } from "../middleware/verifyToken.js";

import { create, update, findOne, findAll, remove } from "../controllers/lectureController.js";

router.get("/", verifyUser, findAll);
router.get("/:id", verifyUser, findOne);
router.post("/create", [verifyUser, upload], create);
router.put("/:id/update", verifyUser, update);
router.delete("/:id", verifyUser, remove);

export default router;
