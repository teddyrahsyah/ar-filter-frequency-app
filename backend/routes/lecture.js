import express from "express";
const router = express.Router();

import { upload } from "../middleware/uploadImage.js";
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
} from "../controllers/lectureController.js";

router.get("/", findAll);
router.get("/favorite", verifyUser, findFavorite);
router.get("/:id", findOne);
router.post("/create", [verifyUser, upload], create);
router.put("/:id/update", [verifyUser, upload], update);
router.delete("/:id", verifyUser, remove);

// Favorite

router.patch("/:id/addfavorite", verifyUser, addToFavorite);
router.patch("/:id/deletefavorite", verifyUser, deleteFavorite);

export default router;
