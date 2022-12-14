import { createSlice } from "@reduxjs/toolkit";

export const chatSlice =  createSlice({
    name:"chat",
    initialState:{
        chatPartnerID: "",
        listUsers: new Map()
    },
    reducers:{
        setChatPartnerID: (state,action)=>{
            state.chatPartnerID = action.payload.chatPartnerID
        },
        setListUser:(state,action)=>{
            state.listUsers.set(action.payload.id, action.payload.displayName)
        }
    }
})

export const {setChatPartnerID, setListUser} = chatSlice.actions
export default chatSlice.reducer