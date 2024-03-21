require('dotenv').config()
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const ChatMessage = require("./Models/Chatmessage.js");


const app = express();
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);
// Database connection
mongoose.connect(process.env.MONGO_URL_USER); //mongodb connection

io.on("connection", (socket) => {
  console.log(`User is connected, ${socket.id}`);
  
  socket.on("message", (data) => {
    const { username, message } = data; // Extract username and message from data object
    // console.log(`Received message from ${username}: ${message}`);
    
    ChatMessage.create({
      username: username,
      socketid: socket.id,
      message: message,
    })
      .then((newMessage) => {
        // Emit the message to all connected clients, including the sender
        io.emit("message", newMessage);
      })
      .catch((error) => {
        console.error("Error saving message:", error);
      });
  });
  
  socket.on("disconnect", () => {
    console.log(`User disconnected, ${socket.id}`);
  });

  socket.on("video", (data) => {
    const {peerid} = data;
    socket.broadcast.emit("video", peerid);
  });
});

io.on("error", (err) => {
  console.error("Socket.io error: " + err);
});


app.get("/api/messages", (req, res) => {
  ChatMessage.find()
    .then((messages) => {
      res.json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

const port = process.env.PORT_2 || 5000;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});