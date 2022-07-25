const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: String },
    senderId: { type: String },
    textData: { type: String },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);

module.exports = { messageModel };
