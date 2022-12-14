import { createSlice } from "@reduxjs/toolkit";

export const peerSlice = createSlice({
  name: "peer",
  initialState: {
    currentPeerID: "",
    connections: new Map()
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections.set(action.payload.userID, action.payload.connection);
    },
    setCurrentPeerID: (state, action) => {
      state.currentPeerID = action.payload.currentPeerID
    }
  },
});

export const { addConnections, setCurrentPeerID } = peerSlice.actions;
export default peerSlice.reducer;
