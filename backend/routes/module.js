import express from "express";
const router = express.Router();

import { uploadImage } from "../middleware/uploadImage.js";
import { verifyUser } from "../middleware/verifyToken.js";

import {
	create,
	update,
	findOne,
	findAll,
	remove,
	findFavorite,
	addToFavorite,
	deleteFavorite,
	createTheory,
	createLab,
    deleteTheory,
    deleteLab,
} from "../controllers/moduleController.js";

router.get("/", findAll);
router.get("/favorite", verifyUser, findFavorite);
router.get("/:id", findOne);
router.post("/create", [verifyUser, uploadImage], create);
router.patch("/:id/create-theory", [verifyUser, uploadImage], createTheory);
router.patch("/:id/create-lab", [verifyUser, uploadImage], createLab);
router.patch("/:id/:theoryId/delete-theory", verifyUser, deleteTheory);
router.patch("/:id/:labId/delete-lab", verifyUser, deleteLab);
router.put("/:id/update", [verifyUser, uploadImage], update);
router.delete("/:id", verifyUser, remove);

// Favorite

router.patch("/:id/addfavorite", verifyUser, addToFavorite);
router.patch("/:id/deletefavorite", verifyUser, deleteFavorite);

export default router;
