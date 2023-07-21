import { UserDefaultDto } from "@/Types/Users/UserDefault.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<UserDefaultDto, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    setMentorAccept: builder.mutation<UserDefaultDto, { id: number }>({
      query: (args: { id: number }) => {
        const body = {
          userId: args.id,
        };
        return {
          url: `/mentor_profiles`,
          data: body,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useGetUserQuery, useSetMentorAcceptMutation } = userApi;
