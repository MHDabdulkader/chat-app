import express from "express"
import { createMessage, getConversation, markRead } from "../controller/message.controller";

const router = express.Router();

router.post("/", createMessage);
router.get("/:user1/:user2", getConversation);
router.patch("/:id/read", markRead);


export default router;
