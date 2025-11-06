import type { Request, Response } from "express";
import { MessageService } from "../service/message.service";

export const createMessage= async (req: Request, res: Response)=>{
    try{
        const {senderId, receiverId, content} = req.body;
        console.log("sender id: ", senderId, " receiver id: ", receiverId, " Content: ", content)
        const message = await MessageService.create(senderId, receiverId, content);
        res.status(200).json(message)
    }catch(error){
        console.log("Create message error, ", error);
        res.status(400).json({error: "Create message error"})
    }
}

export const getConversation = async (req: Request, res: Response)=>{
    try{
        const {user1, user2} = req.body;
        const messages = await MessageService.getMessageBetweenUsers(user1, user2);
        res.status(200).json(messages);
    }
    catch(err: any){
        res.status(400).json({error: err.message})
    }
}

export const markRead = async (req: Request, res: Response)=>{
    try{
        const {id} = req.params;
        console.log("Read msg ", id)
        const message = await MessageService.markAsRead(id);
        res.status(200).json(message);
    }catch(err: any){
        res.status(400).json({error: err.message})
    }
}