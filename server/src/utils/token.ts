import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env";

export const signToken = (payload: object)=>{
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"})

}
export const verifyToken = (token: string)=>{
    return jwt.verify(token, JWT_SECRET)
}