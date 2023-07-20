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
        url: `/category?take=${args.take}&page=${args.page}&category_id=${args.category_id}`,
        method: "GET",
      }),
      transformResponse: (res: HomeResponseDto[]) => {
        return res;
      },
    }),
  }),
});
