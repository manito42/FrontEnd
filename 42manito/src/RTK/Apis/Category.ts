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
        // 중복을 제거하기 위해 id 기반으로 데이터를 결합
        const merged = [...prev, ...next].reduce<HomeResponseDto[]>(
          (accumulator, item) => {
            const isExisting = accumulator.find((i) => i.id === item.id);

            if (!isExisting) {
              accumulator.push(item);
            }

            return accumulator;
          },
          []
        );

        return merged;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
