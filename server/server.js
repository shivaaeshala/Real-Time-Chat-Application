const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {v4 : uuidv4} = require("uuid");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin : "https://real-time-chat-application-pi-three.vercel.app/",
        method : ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("create_room", () => {
        const roomId = uuidv4();
        socket.join(roomId);
        console.log(`Room created with room id ${roomId}`);
        socket.emit("room_created", roomId);
    })

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
        io.to(data.room).emit("receive_message", data);
    });

    socket.on("typing", (room) => {
        socket.to(room).emit("typing");
    });

    socket.on("stop_typing", (room) => {
        socket.to(room).emit("stop_typing");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});


server.listen(3001, ()=> {
    console.log("Server running on port 3001");
});
