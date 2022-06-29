import express from "express";
const router = express.Router();

import { uploadImage } from "../middleware/uploadImage.js";
import { verifyUser } from "../middleware/verifyToken.js";

import {
  create,
  update,
  findOne,
  findAll,
  createTheory,
  createLab,
  deleteTheory,
  deleteLab,
  deleteModule,
} from "../controllers/moduleController.js";

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/create", [verifyUser, uploadImage], create);
router.patch("/:id/create-theory", [verifyUser, uploadImage], createTheory);
router.patch("/:id/create-lab", [verifyUser, uploadImage], createLab);
router.patch("/:id/:theoryId/delete-theory", verifyUser, deleteTheory);
router.patch("/:id/:labId/delete-lab", verifyUser, deleteLab);
router.put("/:id/update", [verifyUser, uploadImage], update);
router.delete("/:id", verifyUser, deleteModule);


export default router;
