const onlineUsersGetSocketId = {};
const onlineUsersGetUserId = {};

exports = module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("login", (data) => {
      const currUserId  = data.currUserId;
      //userId:socketid (get socketId)
      onlineUsersGetSocketId[currUserId] = socket.id;
      //socketid:userid (get userId)
      onlineUsersGetUserId[socket.id] = currUserId;
    })

    //   // broadcast to every socketid about new user's online status
    //   socket.emit.broadcast("newUserOnline", {userId: onlineUsersGetUserId[socket.id]})
    // };
    // emit if the user is online -> true or false
    socket.on("userOnlineStatusReq", (data)=>{
      let socketId = onlineUsersGetSocketId[data.userId]
      console.log("socketId:",socketId);
      if(socketId) {
        console.log("user online! : ", socketId);
        socket.emit("userOnlineStatusRes", {isOnline:true})
      } else{socket.emit("userOnlineStatusRes", {isOnline:false})}
    })
    socket.on('disconnect', function() {
      let userIdOfUserLeft=  onlineUsersGetUserId[socket.id]
        socket.broadcast.emit("userLeft", {userId: userIdOfUserLeft})
        delete onlineUsersGetUserId[socket.id]
        delete onlineUsersGetSocketId[userIdOfUserLeft]
        console.log("after delete");

      ;})
    socket.on("privateMessage", (data) => {
      let senderSocketId = socket.id;
      const senderUserId = onlineUsersGetUserId[senderSocketId];
      let userIdOfReciever = data.recieverId;
      const socketIdOfreciever = onlineUsersGetSocketId[userIdOfReciever];
      if (socketIdOfreciever) {
        socket
          .to(socketIdOfreciever)
          .emit("newMessage", {
            senderId: senderUserId,
            message: data.message,
          });
      } else {
        console.log(
          "Reciever not online! socketIdOfreciever:",
          socketIdOfreciever,
          "senderUserId:",
          senderUserId
        );
      }
    });
  });
};
