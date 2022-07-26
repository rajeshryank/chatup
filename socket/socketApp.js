const onlineUsersMongoSocketId = {};
const onlineUsersSocketMongoId = {};

exports = module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("login", (data) => {
      const { loggedInId } = data;
      //MongoId:socketid (returns socketId)
      onlineUsersMongoSocketId[loggedInId] = socket.id;
      //socketid:mongoid (returns mongo id)
      onlineUsersSocketMongoId[socket.id] = loggedInId;
    });
    socket.on("privateMessage", (data) => {
      let senderSocketId = socket.id;
      const senderMongoId = onlineUsersSocketMongoId[senderSocketId];
      let mongoIdOfReciever = data.recieverMongoId;
      const socketIdOfreciever = onlineUsersMongoSocketId[mongoIdOfReciever];
      if (socketIdOfreciever) {
        socket
          .to(socketIdOfreciever)
          .emit("newMessage", {
            senderId: senderMongoId,
            message: data.message,
          });
      } else {
        console.log(
          "ERROR!! socketIdOfreciever:",
          socketIdOfreciever,
          "senderMongoId:",
          senderMongoId
        );
      }
    });
  });
};
