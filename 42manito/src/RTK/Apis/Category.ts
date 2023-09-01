import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import { HomeGetCategoryDto } from "@/Types/Homes/HomeGetCategory.dto";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    getCategoryMentors: builder.mutation<
      MentorProfileDto[],
      HomeGetCategoryDto
    >({
      query: (args: HomeGetCategoryDto) => {
        return {
          url: `/home/${args.category_id}?take=${args.take}&page=${args.page}`,
          method: "GET",
        };
      },
    }),
    getCategories: builder.query<CategoriesResponseDto[], void>({
      query: () => {
        return {
          url: `/categories`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCategoryMentorsMutation, useGetCategoriesQuery } =
  categoryApi;
