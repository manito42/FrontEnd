import { HomeGetCategoryDto } from "@/Types/Homes/HomeGetCategory.dto";
import { HomeResponseDto } from "@/Types/Homes/HomeResponse.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    getCategory: builder.query<HomeResponseDto[], HomeGetCategoryDto>({
      query: (args: HomeGetCategoryDto) => ({
        url: `/home/${args.category_id}?take=${args.take}&page=${args.page}`,
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

export const { useGetCategoryQuery } = categoryApi;
