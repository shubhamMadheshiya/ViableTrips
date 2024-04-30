// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../../app/api/apiSlice";

// It's good practice to define the base URL as a constant,
// making it easier to change in the future if needed.
// const BASE_URL = "http://localhost:3000/api";

export const contactApi = apiSlice.injectEndpoints({
  // reducerPath: "contactApi",
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Buddy"], // This is correct if you're planning to use tags for cache invalidation or optimistic updates

  endpoints: (builder) => ({
    submitFormData: builder.mutation({
      query: (formData) => ({
        url: "/buddy",
        method: "POST",
        body: formData,
      }),
      // `providesTags` can be used to let your app know that this mutation affects
      // any queries that subscribe to the 'Buddy' tag, potentially invalidating the cache.
      // This is only necessary if you have corresponding queries that should be updated or invalidated.
      // If you're not using it in such a manner, you might not need `providesTags` here.
      providesTags: ["Buddy"],

      // Consider adding `invalidatesTags` if there's a specific query that needs to be invalidated after this mutation.
      // invalidatesTags: [{ type: 'Buddy', id: 'LIST' }],

      // If you expect a dynamic response that affects different parts of your application,
      // you might dynamically assign tags based on the response.
      // providesTags: (result, error, arg) => [{ type: 'Buddy', id: arg.id }],
    }),
  }),
});

export const { useSubmitFormDataMutation } = contactApi;
