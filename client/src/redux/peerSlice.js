import { createSlice } from "@reduxjs/toolkit";

export const peerSlice = createSlice({
  name: "peer",
  initialState: {
    currentPeerID: "",
    connections: []
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections.push(action.payload.connection);
    },
    setCurrentPeerID: (state, action) => {
      state.currentPeerID = action.payload.currentPeerID
    }
  },
});

export const { addConnections, setCurrentPeerID } = peerSlice.actions;
export default peerSlice.reducer;
