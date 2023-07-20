import { HomeGetAllDto } from "@/Types/Homes/HomeGetAll.dto";
import { HomeResponseDto } from "@/Types/Homes/HomeResponse.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    getHome: builder.query<HomeResponseDto[], HomeGetAllDto>({
      query: (args: HomeGetAllDto) => ({
        url: `/home?take=${args.take}&page=${args.page}`,
        method: "GET",
      }),
      merge: (prev, next) => {
        prev.push(...next);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetHomeQuery } = homeApi;
