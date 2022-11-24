import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    time: {type: Date, default: Date.now},
    content: String,

})

module.exports = mongoose.model('message', messageSchema)