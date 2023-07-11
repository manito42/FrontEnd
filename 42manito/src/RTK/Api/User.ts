import { UserResDto } from "@/Types/UserResDto";
import { baseQueryWithGlobalErrorHandler } from "@/utils/BaseQueryErrorHandler";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// User RTKQuery 코드

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithGlobalErrorHandler,
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResDto[], { take: number; page: number }>({
      query: ({ take, page }) => {
        return {
          url: `${process.env.NEXT_PUBLIC_}/users/`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
    }),
    getUser: builder.query<UserResDto, { id: number }>({
      query: ({ id }) => {
        return {
          url: `${process.env.NEXT_PUBLIC_}/users/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery } = userApi;
