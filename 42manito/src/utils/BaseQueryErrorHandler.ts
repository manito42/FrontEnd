import {
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
import redirectToLogin from "./RedirectLogin";
import route from "next/router";

export const baseQueryWithGlobalErrorHandler = async (
  args: any,
  api: any,
  extra: any
) => {
  const result = await fetchBaseQuery()(args, api, extra);
  if (result.error) {
    const error = result.error as FetchBaseQueryError;

    if (error.status === 401) {
      redirectToLogin(route);
    } else if (error.status === 404) {
      // 404 에러 처리
    } else if (error.status === 403) {
      // 403 에러 처리
    } else if (error.status === 405) {
      // 405 에러 처리
    } else if (error.status === 500) {
      // 500 에러 처리
    }
  }
  return result;
};
