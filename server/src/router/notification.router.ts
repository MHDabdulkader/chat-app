import  express  from "express";

import { create, getByUserNotification, markAsRead, deleted } from "../controller/notification.controller";

const router = express.Router()

router.get("/:userId",getByUserNotification)
router.post("/", create)
router.patch("/:id/read", markAsRead)
router.delete("/:id", deleted)

export default router;