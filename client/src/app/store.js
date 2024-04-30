import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import contactReducer from "../components/Buddy/buddySlice";
// import userReducer from "../components/MyLogin/userSlice";
import { combineReducers } from "redux";
import authReducer from "../components/Auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
// 1. Combine reducers
const rootReducer = combineReducers({
  contact: contactReducer,
  auth:authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
