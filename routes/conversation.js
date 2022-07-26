const express = require("express");
const app = express();
//body parser
app.use(express.json());

const { conversationModel } = require("../models/Conversation");
const { authenticateToken } = require("../functions/authenticationFunctions.js");
const { messageModel } = require("../models/Message");

//upload convoid to DB if new, else return conversation id with messages if present.
app.post("/conversation", authenticateToken, async (req, res) => {
  let data = [req.body.senderId, req.body.receieverId];
  try {
    let oldConvo = await conversationModel.findOne({ members: { $all: data } });

    if (oldConvo) {
      console.log("old conversation found!")
      let convoId = oldConvo._id;
      let messages = await messageModel.find({ conversationId: convoId });
      return res.json({ convoId, messages });
    }
    console.log("Creating new conversation model..");
    let newConvo = new conversationModel({
      members: data,
    });
    await newConvo.save();
    console.log("Conversation uploaded to DB successfully!");
    return res.json(newConvo._id);
  } catch (error) {
    console.log(error);
  }
});

// get convoid of specific user
app.get("/conversation/:userid", authenticateToken, async (req, res) => {
  try {
    console.log("searching for matching convos with given userId..");
    let convo = await conversationModel.find({
      members: { $in: [req.params.userid] },
    });
    if (convo) console.log("Match found!");
    return res.json(convo);
  } catch (error) {
    return res.json(error);
  }
});
module.exports = { conversationRoute: app };
