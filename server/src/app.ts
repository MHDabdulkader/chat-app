import  express  from "express";
import cors from "cors"
import authRouter from "./router/auth.router";
import notificationRouter from "./router/notification.router"
import messageRouter from "./router/message.router"
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/users", authRouter);
app.use("/api/notifications", notificationRouter)
app.use("/api/messages", messageRouter);
export default app;