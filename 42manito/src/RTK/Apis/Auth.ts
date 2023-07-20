import { TestAuthResDto } from "@/Types/Auths/TestAuthRes.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TestAuthResDto, void>({
      query: () => ({
        url: `/dev/login/1`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
