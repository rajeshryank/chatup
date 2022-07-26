require("dotenv").config();
const { loginSignupRoute } = require("./routes/loginSignup");
const { conversationRoute } = require("./routes/conversation");
const { messagesRoute } = require("./routes/message");
const { connectToDb } = require("./functions/functions");
const { userRoute } = require("./routes/user");
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(loginSignupRoute, conversationRoute, messagesRoute, userRoute);
//socket
const server = require("http").createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
require("./socket/socketApp")(io);

app.use(express.static(path.join(__dirname, "/client")));

//connectiong to mongoDB
connectToDb();

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App listening on ${port}`);
});
