import customAxios from "@/utils/CustomAxios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

const reservationBaseQuery =
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

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: reservationBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MOC_URL}`,
  }),
  endpoints: (builder) => ({
    // TODO: 추후에
  }),
});