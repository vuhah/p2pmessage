import mongoose, { Schema, SchemaType } from "mongoose";

const userSchema = mongoose.Schema({
    password: {type:String, require:true},
    username: {type:String, require:true},
    displayName : {type: String, require: true},
    refreshToken: {type: String, require: true},
})


export const user = mongoose.model('user',userSchema)