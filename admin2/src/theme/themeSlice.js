// themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("themeMode") || "light", // Retrieve mode from localStorage
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode); // Save new mode to localStorage
      state.mode = newMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;
