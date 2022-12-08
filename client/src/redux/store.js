import { configureStore } from "@reduxjs/toolkit";
import peerReducer from "./peerSlice";
import { enableMapSet } from "immer";

enableMapSet();

export default configureStore({
  reducer: {
    peer: peerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["peer/updatePeer"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "meta.arg",
          "payload.timestamp",
          "payload.connection",
          "peer.connections",
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          "peer.peer",
          "peer.connections",
        ],
      },
    }),
});
