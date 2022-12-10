import { createSlice } from "@reduxjs/toolkit";

const entryPageSlice = createSlice({
  name: "entryPage",
  initialState: {
    currentTab: "intro",
  },
  reducers: {
    switchIntro: (state) => {
      state.currentTab = "intro";
    },
    switchLoginPanel: (state) => {
      state.currentTab = "login";
    },
    switchRegisterPanel: (state) => {
      state.currentTab = "register";
    },
  },
});

export const { switchIntro, switchLoginPanel, switchRegisterPanel } = entryPageSlice.actions;
export default entryPageSlice.reducer;
