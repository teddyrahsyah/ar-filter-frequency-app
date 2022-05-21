import express from "express";
const router = express.Router();

import { create, update, findOne, findAll, remove } from "../controllers/lectureController.js";

router.post("/create", create);
router.put("/:id/update", update);
router.get("/:id", findOne);
router.get("/", findAll);
router.delete("/:id", remove);

export default router;
