import type { Request, Response } from "express";

import { NotificationService } from "../service/notificationService";


export const create = async (req: Request, res: Response) => {
    try {
        const { userId, content, token } = req.body;
        const notification = await NotificationService.createNotification(
            userId, content, token
        );
        console.log("Notifications create: ", notification)
        return res.status(201).json({ content: notification?.content, userId: notification?.userId, isRead: notification?.isRead });

    } catch (error) {
        console.log("Notification create error, Notification controller ", error);
        return res.status(500).json({ error: "Failed to create notification" })
    }
}
export const getByUserNotification = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const notification = await NotificationService.getUserNotifications(userId);

        return res.status(200).json(notification);
    } catch (error) {
        console.log("Notification get find error, Notification controller ", error);
        return res.status(500).json({ error: "Failed to get notification" })
    }
}
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await NotificationService.markAsRead(id);
        return res.status(200).json(updated);
    } catch (error) {
        console.log("Notification update error, Notification controller ", error);
        return res.status(500).json({ error: "Failed to update notification" })
    }
}

export const deleted =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await NotificationService.deleteNotification(id);
        return res.status(200).json({ msg: "Notification Deleted" });
    } catch (error) {
        console.log("Notification delete error, Notification controller ", error);
        return res.status(500).json({ error: "Failed to delete notification" })
    }
}
