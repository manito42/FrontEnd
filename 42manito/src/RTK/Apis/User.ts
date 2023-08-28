import { UserDefaultDto } from "@/Types/Users/UserDefault.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<UserDefaultDto, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    setMentorAccept: builder.mutation<MentorProfileDto, { id: number }>({
      query: (args: { id: number }) => {
        const body = {
          userId: args.id,
        };
        return {
          url: `/mentor_profiles`,
          data: body,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    setIsHide: builder.mutation<
      MentorProfileDto,
      { id: number; isHide: boolean }
    >({
      query: (args: { id: number; isHide: boolean }) => {
        const body = {
          isHide: args.isHide,
        };
        return {
          url: `/mentor_profiles/${args.id}`,
          data: body,
          method: "PATCH",
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    setUserUpdate: builder.mutation<MentorProfileDto, MentorProfilePatchReqDto>(
      {
        query: (args: MentorProfilePatchReqDto) => {
          return {
            url: `/mentor_profiles/${args.id}`,
            data: args,
            method: "PATCH",
          };
        },
        invalidatesTags: [{ type: "User", id: "LIST" }],
      }
    ),
    postHashtag: builder.mutation<HashtagGetDto, HashtagPostDto>({
      query: (args: HashtagPostDto) => {
        return {
          url: `/hashtags`,
          data: args,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useSetMentorAcceptMutation,
  useSetUserUpdateMutation,
  usePostHashtagMutation,
  useSetIsHideMutation,
} = userApi;
