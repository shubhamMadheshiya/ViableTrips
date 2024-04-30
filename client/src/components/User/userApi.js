import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../../app/api/apiSlice";



export const userApi = apiSlice.injectEndpoints({
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "GET",
      }),
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled }
      ) {
        try {
         const data = await queryFulfilled
         console.log(data);
          
        } catch (error) {
          console.log(error)
          
        }
      },
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `user/${id}`, // Remove colon from URL template
        method: "PUT",
        body: { ...userData },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({id}) => ({
        // Only pass userId, as DELETE requests typically don't have a body
        url: `user/${id}`, // Remove colon from URL template
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});


export const { useUpdateUserMutation, useDeleteUserMutation, useGetUserQuery } =
  userApi;
