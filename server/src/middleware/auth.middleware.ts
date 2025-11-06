
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({error: "Unauthorization"})
    }

    try{
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    }catch{
        return res.status(401).json({error: "Invalid token"})
    }
}