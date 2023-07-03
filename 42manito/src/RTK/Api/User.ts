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
    getUsers: builder.query<UserResDto[], { take: number; page: number }>({
      query: ({ take, page }) => {
        return {
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/users?take=${take}&page=${page}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
