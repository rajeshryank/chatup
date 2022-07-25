const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
members : {type:Array}
    // array will contain senderId and ReceieverId
}, {timestamps : true})

const conversationModel = mongoose.model("conversation", conversationSchema)

module.exports = {conversationModel}

