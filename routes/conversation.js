const express = require("express");
const app = express();
//body parser
app.use(express.json());

const { conversationModel } = require("../models/Conversation");
const { authenticateToken } = require("../functions/functions");
const { messageModel } = require("../models/Message");

//post convo to DB and send conversation id 
//if convo id present return with messages else just convo ID
app.post("/conversation", authenticateToken, async (req, res) => {
  //search in db to check if conversation exist
  let data = [req.body.senderId, req.body.receieverId];
  // console.log(req.body)
  try {
    let oldConvo = await conversationModel.findOne({ members: { $all: data } });

    if (oldConvo) {
      // console.log( "oldCovo found!! :",oldConvo)
      let convoId = oldConvo._id;
      let messages = await messageModel.find({ conversationId: convoId });
      return res.json({ convoId, messages });
    }
    console.log("Creating new convo model..");
    let newConvo = new conversationModel({
      members: data,
    });
    await newConvo.save();
    console.log("Conversation uploaded to DB successfully!");
    //sends conversation id
    return res.json(newConvo._id);
  } catch (error) {
    console.log(error);
  }
});

// get convo of specific user
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
