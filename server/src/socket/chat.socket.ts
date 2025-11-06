import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import { JWT_SECRET } from "../config/env";

export default function chatSocket(io: Server) {

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        console.log("Socket token: ", token);

        if (!token) {
            return next(new Error("No token"));
        }

        try {
            const user = jwt.verify(token, JWT_SECRET);
            (socket as any).user = user;
            next();
        } catch {
            next(new Error("Invaild Token"));
        }
    })

    io.on("connection", (socket) => {
        const user = (socket as any).user
        console.log("user connected: ", (socket as any).user.email);
        socket.join(user.id);
        socket.on("send message", async (data: { content: string; receiverId: string }) => {
            try {
                const msg = await prisma.message.create({
                    data: {
                        content: data.content,
                        senderId: user,
                        receiverId: data.receiverId
                    },
                    include: { sender: true, receiver: true },
                })

                io.to(data.receiverId).emit("receive_message", msg);
                io.to(user.id).emit("messge_send", msg)
                console.log(`💬 Message from ${user.username} to ${data.receiverId}: ${data.content}`);
            }catch(error){
                console.log("msg send failed!", error);
            }
            
        })

        socket.on("disconnect", ()=>{
            console.log("User disconnected: ", user.email)
        })
    })
}