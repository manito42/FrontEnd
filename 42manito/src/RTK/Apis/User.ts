import { HashtagPostDto } from "@/Types/Hashtags/HashtagPost.dto";
import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { MentorProfilePatchReqDto } from "@/Types/MentorProfiles/MentorProfilePatchReq.dto";
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
    setUserUpdate: builder.mutation<
      MentorProfileDto,
      { id: number; profile: MentorProfilePatchReqDto }
    >({
      query: (args: { id: number; profile: MentorProfilePatchReqDto }) => {
        return {
          url: `/mentor_profiles/${args.id}`,
          data: args.profile,
          method: "PATCH",
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    postHashtag: builder.mutation<HashtagResponseDto, HashtagPostDto>({
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
