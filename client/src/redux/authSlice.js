import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        authState:false
    },
    reducers:{
        setAuthState : (state, action) => {
            state.authState = action.payload.authState
        }
    }
})

export const {setAuthState} = authSlice.actions
export default authSlice.reducer