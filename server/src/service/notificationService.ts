import prisma from "../prisma/client";

import { sendPushNotification } from "../utils/firebaseAdmin";

export class NotificationService {
    static async createNotification(userId: string, content: string, token: string){
        const notification = await prisma.notification.create({
            data:{
                userId,
                content
            },
        });
        if(token){
            const user = await prisma.user.findUnique({
                where:{id:userId},
                select: {username: true}
            })
            const title = user? `${user.username || "Anonymous"}` : "New Notification";
            await sendPushNotification(
                token, title, content
            )

            return notification;
        }
        return notification;
    }

    static async getUserNotifications(userId: string){
        return prisma.notification.findMany({
            where: {userId},
            orderBy: {createAt: "desc"}
        })
    }

    static async markAsRead(notificationId: string){
        return prisma.notification.update({
            where: {id: notificationId},
            data: {isRead: true},
        })
    }
    static async deleteNotification(notificationId: string){
        return prisma.notification.delete({
            where:{id:notificationId}
        })
    }
}