import { TestAuthResDto } from "@/Types/Auths/TestAuthRes.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { setTokenCookie } from "@/utils/TestSetCookie";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { access } from "fs";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TestAuthResDto, { id: number }>({
      query: (args: { id: number }) => ({
        url: `/dev/login/${args.id}`,
        method: "GET",
      }),
      transformResponse: (response: TestAuthResDto) => {
        const accessToken = response.accessToken;
        if (accessToken) {
          setTokenCookie(accessToken);
        }

        return response;
      },
    }),
    authSignIn: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/42`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthSignInMutation } = authApi;
