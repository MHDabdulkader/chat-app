import prisma from "../prisma/client";

export class MessageService {
    static async create(senderId: string, receiverId: string, content: string, conversationId?: string) {

        console.log("service sender id: ", senderId, " receiver id: ", receiverId, " Content: ", content)
        if (senderId.length > 0 && receiverId.length > 0 && content.length > 0) {
            let conversation = await prisma.conversation.findFirst({
                where: {
                    OR: [
                        { message: { some: { senderId, receiverId } } },
                        { message: { some: { senderId: receiverId, receiverId: senderId } } }
                    ]
                }
            })

            if (!conversation) {
                conversation = await prisma.conversation.create({
                    data: {
                        subject: `Chat between ${senderId} and ${receiverId}`
                    }
                })
            }

            const message = await prisma.message.create({
                data: {
                    senderId,
                    receiverId,
                    content,
                    conversationId: conversation.id,
                },
                include: {
                    sender: true,
                    receiver: true,
                    conversation: true
                }
            })

            return {
                id: message.id,
                content: message.content,
                isRead: message.isRead,
                sender:{
                    id: message.sender.id,
                    username: message.sender.username
                },
                receiver: {
                    id: message.receiver.id,
                    username: message.receiver.username
                },
                conversation:{
                    id: message.conversation?.id,
                    subject: message.conversation?.subject
                },
                createAt: message.createAt
                

            }
        }
        else {
            throw new Error("Missing required field!")
        }


    }
    static async getMessageBetweenUsers(userId1: string, userId2: string) {
        if (!userId1 || !userId2) {
            throw new Error("Missing required field!")
        }

        return await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            },
            orderBy: { createAt: 'asc' },
            include: { sender: true, receiver: true }
        })
    }

    static async markAsRead(messageId: string) {
        if (messageId.length <=0) {
            throw new Error("Missing required field!")
        }

        return await prisma.message.update({
            where: { id: messageId },
            data: { isRead: true }
        })
    }
}