import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import customAxios from "./CustomAxios";

export const BaseQuery =
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
      if (err.status === 400) {
        alert("잘못된 요청입니다.");
      } else if (err.status === 404) {
        alert("존재하지 않는 작업입니다.");
      } else if (err.status === 409) {
        alert("이미 완료된 작업입니다.");
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
