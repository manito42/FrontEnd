import { UserResDto } from "@/Types/UserResDto";
import { baseQueryWithGlobalErrorHandler } from "@/utils/BaseQueryErrorHandler";
import customAxios from "@/utils/CustomAxios";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

const userBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await customAxios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      // 나중에 여기서 에러처리들을 하면 됨 (400, 404, 409 등)

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// User RTKQuery 코드

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: userBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MOC_URL}`,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResDto[], { take: number; page: number }>({
      query: ({ take, page }) => {
        return {
          url: `/users/`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
    }),
    getUser: builder.query<UserResDto, { id: number }>({
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

export const { useGetAllUsersQuery, useGetUserQuery } = userApi;
