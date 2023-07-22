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
    getMentors: builder.mutation<HomeResponseDto[], HomeGetAllDto>({
      query: (args: HomeGetAllDto) => {
        return {
          url: `/home?take=${args.take}&page=${args.page}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetMentorsMutation } = homeApi;
