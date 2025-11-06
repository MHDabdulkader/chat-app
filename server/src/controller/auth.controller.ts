import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import { signToken } from "../utils/token";

export const register = async(req: Request, res: Response)=>{
    const {email, password, username} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({data:{email: email, password: hashed, username: username}});
    if(user){
        return res.status(201).json({id:user.id, email:user.email, username: user.username});
    }else{
        return res.status(501).json({error: "create user error"});
    }
}

export const login = async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where: {email}});
    if(!user){
        return res.status(404).json({error: "User not founded!"});
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        return res.status(401).json({error: "Invalid password"});
    }

    const token = signToken({id: user.id, email:user.email});
    res.json({token})
}

export const getUser = async(req:Request, res: Response)=>{
    const {email} = req.body;
    const user = await prisma.user.findUnique({where:{email}});
    if(!user){
        return res.status(404).json({error: "User not founded!"});
    }
    res.status(200).json({id: user.id, username: user.username})
}