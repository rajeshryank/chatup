const express = require("express");
const app = express();
//body parser
app.use(express.json());
const { authenticateToken } = require("../functions/functions");
app.post('/')

const { messageModel } = require("../models/Message");

app.post("/message", authenticateToken, async (req,res)=>{
    try {
        let newMessage = new messageModel(req.body)
        await newMessage.save()
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500).json(error)
    }
})

module.exports = {messagesRoute:app}