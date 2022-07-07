import express from "express";
import { verifyUser } from "../middleware/verifyToken.js";
import { createMessage, getMessages, getMessageById, deleteMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getMessages);
router.get("/:id", getMessageById);
router.post("/create", createMessage);
router.delete("/:id", verifyUser, deleteMessage);

export default router;