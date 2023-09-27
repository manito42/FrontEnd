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
    getMentors: builder.query<HomeResponseDto[], HomeGetAllDto>({
      query: (args: HomeGetAllDto) => {
        const setCategoryQuery = args.category_id ? `/${args.category_id}` : "";
        return {
          url: `/home${setCategoryQuery}?take=${args.take}&page=${args.page}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetMentorsQuery } = homeApi;
