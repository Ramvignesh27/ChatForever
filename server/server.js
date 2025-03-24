const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();

app.use(
  cors({
      origin: "https://chat-forever-client.vercel.app/", // Allow only your frontend origin
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const clientBuildPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientBuildPath));

const connectDB = require("./config/db");
connectDB();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);


const server = app.listen(PORT,
    console.log(`server is running in port ${PORT}`));

    const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
          origin: "https://chat-forever-client.vercel.app/",
          // credentials: true,
        },
      });
      
      io.on("connection", (socket) => {
        console.log("Connected to socket.io");
        socket.on("setup", (userData) => {
          socket.join(userData._id);
          socket.emit("connected");
        });
      
        socket.on("join chat", (room) => {
          socket.join(room);
          console.log("User Joined Room: " + room);
        });
        socket.on("typing", (room) => socket.in(room).emit("typing"));
        socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
      
        socket.on("new message", (newMessageRecieved) => {
          var chat = newMessageRecieved.chat;
          
          if (!chat.users) return console.log("chat.users not defined");
      
          chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
      
            socket.in(user._id).emit("message recieved", newMessageRecieved);
          });
        });
      
        socket.off("setup", () => {
          console.log("USER DISCONNECTED");
          socket.leave(userData._id);
        });
      });