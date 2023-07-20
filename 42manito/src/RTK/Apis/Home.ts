import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => ({
        url: `/home`,
        method: "GET",
      }),
    }),
  }),
});
