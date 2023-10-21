const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const ChatMessage = require("./Models/Chatmessage.js");
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);
// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/User"); //mongodb connection

io.on("connection", (socket) => {
  console.log(`user is  connected,${socket.id}`);
  socket.on("message", (message) => {
    console.log(message);
    const username = "someUsername"; // Replace this with actual username logic
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
    console.log("User disconnected", socket.id);
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

const port = 5000;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
