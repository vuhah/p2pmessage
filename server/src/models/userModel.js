import mongoose, { Schema, SchemaType } from "mongoose";

const userSchema = mongoose.Schema({
    password: {type:String, require:true},
    username: {type:String, require:true},
    displayName : {type: String, require: true},
    rooms: [{
        _id: Schema.Types.ObjectId,
        otherUser: Schema.Types.ObjectId,
        messages:[{
            sender: Boolean,
            content: String,
            time: Date
        }] 
    }]
})


export const User = mongoose.model('user',userSchema)