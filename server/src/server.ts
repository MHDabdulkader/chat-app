import http from "http"
import { Server } from "socket.io";
import app from "./app";

import chatSocket from "./socket/chat.socket";
import { PORT } from "./config/env";


const server = http.createServer(app);

const io = new Server(server, {cors: {origin: "*"}});

chatSocket(io);

server.listen(PORT, ()=>{
    console.log(`Server running on Port:${PORT}`)
})