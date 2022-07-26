const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
app.use(express.urlencoded({
    extended: true
  }));
const { authenticateToken } = require("../functions/authenticationFunctions.js");
const { messageModel } = require("../models/Message");

//store message to DB
app.post("/message", authenticateToken, async (req,res)=>{
    try {
        let newMessage = new messageModel(req.body)
        await newMessage.save()
        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500).json(error)
    }
})

module.exports = {messagesRoute:app}