import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        authState:true,
        userID: "",
        userDisplayName: "",
    },
    reducers:{
        setAuthState : (state, action) => {
            state.authState = action.payload.authState
        },
        setUserID: (state, action) => {
            state.userID = action.payload.userID
        },
        setUserDisplayName: (state, action) => {
            state.userDisplayName = action.payload.userDisplayName
        },

    }
})

export const {setAuthState, setUserID, setUserDisplayName} = authSlice.actions
export default authSlice.reducer