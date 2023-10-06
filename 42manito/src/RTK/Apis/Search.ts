import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { SearchGetDto } from "@/Types/Searchs/SearchGet.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ObjectToURLString } from "@/utils/ObjectToURLString";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    getSearch: builder.mutation<MentorProfileDto[], SearchGetDto>({
      query: (args: SearchGetDto) => {
        const keyword = args.search_string;
        const query = ObjectToURLString({ ...args, search_string: undefined });
        return {
          url: `/search/mentor/${encodeURIComponent(keyword)}${query}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSearchMutation } = searchApi;
