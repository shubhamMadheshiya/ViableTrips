import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      profileUrl: "",
      admin: "",
    },
    token: null,
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.user = action.payload;
    },
    setTokenCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setTokenCredentials ,setUserCredentials, logOut,  } = authSlice.actions;

export default authSlice.reducer;



export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
