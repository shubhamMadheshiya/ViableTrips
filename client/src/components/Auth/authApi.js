import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../../app/api/apiSlice";
import { setTokenCredentials, setUserCredentials, logOut } from "./authSlice";

const BASE_URL = "http://localhost:3000/api/auth";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (phoneNumber) => ({
        url: "auth/send-otp",
        method: "POST",
        body: { phone: phoneNumber },
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOTP: builder.mutation({
      query: ({ phoneNumber, otp }) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: { phone: phoneNumber, otp: otp },
      }),
      invalidatesTags: ["Auth"],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    sendLogout: builder.mutation({
      
      query: () => ({
        url: "/auth/logOut",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log("logout");
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken ,user } = data;
          dispatch(setTokenCredentials({ accessToken }));
          dispatch(setUserCredentials(user));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useRegisterUserMutation,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApi;
