require("dotenv").config();
const { loginSignupRoute } = require("./routes/loginSignup");
const { conversationRoute } = require("./routes/conversation");
const { messagesRoute } = require("./routes/message");
const { connectToDb } = require("./functions/functions");
const { userRoute } = require("./routes/user");
const path = require("path")
const express = require("express");
const app = express();

//socket
const server = require("http").createServer(app)
const socketio = require("socket.io")
const io = socketio(server)
const onlineUsersMongoSocketId = {};
const onlineUsersSocketMongoId = {}

io.on("connection", (socket)=>{
  socket.on("login", (data)=>{
    console.log("onlineUserId: ",data.loggedInId);
    const {loggedInId} = data
    //MongoId:socketid (returns socketId)
    onlineUsersMongoSocketId[loggedInId] = socket.id
    //socketid:mongoid (returns mongo id)
    onlineUsersSocketMongoId[socket.id] = loggedInId
    console.log("mongoId:socketId", onlineUsersMongoSocketId,
    "socketId:mongoId", onlineUsersSocketMongoId)
  })
  //
  socket.on("privateMessage", (data)=>{
    let senderSocketId = socket.id
    const senderMongoId = onlineUsersSocketMongoId[senderSocketId]
    let mongoIdOfReciever = data.recieverMongoId
    const socketIdOfreciever = onlineUsersMongoSocketId[mongoIdOfReciever]
    if(socketIdOfreciever ){
      socket.to(socketIdOfreciever).emit("newMessage", {senderId:senderMongoId, 
        message:data.message}) 
    }else{
      console.log("ERROR!! socketIdOfreciever:", socketIdOfreciever,
      "senderMongoId:",senderMongoId);
    }
  })
})

app.use(express.static(path.join(__dirname , "/client")))
//connectiong to mongoDB
connectToDb();
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// //routes
// app.use(express.static(path.join(__dirname, "/public")))y
app.use(loginSignupRoute, conversationRoute, messagesRoute, userRoute);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App listening on ${port}`);
});
