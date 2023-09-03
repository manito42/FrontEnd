import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";

export const hashtagApi = createApi({
  reducerPath: "hashtagApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  endpoints: (builder) => ({
    searchHashtags: builder.query<HashtagResponseDto[], string>({
      query: (search: string) => {
        if (search.length === 0) {
          return {
            url: `/hashtags`,
            method: "GET",
          };
        }
        return {
          url: `/hashtags?search=${search}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useSearchHashtagsQuery } = hashtagApi;
