import { UserDefaultDto } from "@/Types/Users/UserDefault.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MOC_URL}`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<UserDefaultDto, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
