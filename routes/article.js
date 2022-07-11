import express from "express";

import { uploadImage } from "../middleware/uploadImage.js";
import { verifyUser } from "../middleware/verifyToken.js";

import { create, findAll, findOne, update, remove } from "../controllers/articleController.js";

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/create", [verifyUser, uploadImage], create);
router.put("/:id/update", [verifyUser, uploadImage], update);
router.delete("/:id", verifyUser, remove);

export default router;
