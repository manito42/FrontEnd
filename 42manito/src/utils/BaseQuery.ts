import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Router from "next/router";

// 에러 타입 인터페이스 생성
export interface ErrorResponse {
  status: number | undefined;
  data: any;
}

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
    ErrorResponse
  > =>
  async ({ url, method, data, params }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // 헤더에 토큰을 추가합니다.
        },
        timeout: 5000,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      if (err.status === 400) {
        alert("잘못된 요청입니다.");
        Router.push("/");
      } else if (err.status === 404) {
        alert("존재하지 않는 작업입니다.");
        Router.push("/404");
      } else if (err.status === 409) {
        alert("이미 완료된 작업입니다.");
      } else if (err.status === 401) {
        alert("로그인이 필요합니다.");
        Router.push("/");
      } else if (err.status === 403) {
        alert("권한이 없습니다.");
      } else if (err.status === 500) {
        alert("서버에 오류가 발생했습니다.");
      } else if (err.status === 503) {
        alert("서버가 점검중입니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
