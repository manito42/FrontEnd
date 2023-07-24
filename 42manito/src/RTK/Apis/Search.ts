import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { SearchGetDto } from "@/Types/Searchs/SearchGet.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    getSearch: builder.mutation<MentorProfileDto[], SearchGetDto>({
      query: (args: SearchGetDto) => {
        return {
          url: `/search/mentor/${encodeURIComponent(args.search_string)}?take=${
            args.take
          }&page=${args.page}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSearchMutation } = searchApi;
