import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import { MentorProfilePatchDto } from "@/Types/Mentor/MentorProfilePatchDto";
import customAxios from "@/utils/CustomAxios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

const mentorBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await customAxios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      // 나중에 여기서 에러처리들을 하면 됨 (400, 404, 409 등)

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  baseQuery: mentorBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_MOC_URL}` }),
  endpoints: (builder) => ({
    getAllMentor: builder.query<
      mentorResDto[],
      { take: number; page: number; category_id?: number; hashtag_id?: number }
    >({
      query: (args: {
        take: number;
        page: number;
        category_id?: number;
        hashtag_id?: number;
      }) => {
        const query =
          "take=" +
          String(args.take) +
          "&page=" +
          String(args.page) +
          (args.category_id === undefined
            ? ""
            : "&category_id=" + args.category_id);
        return {
          url: `/mentor_profiles?${query}`,
          method: "GET",
        };
      },
    }),
    getOneMentor: builder.query<mentorResDto, { id: number }>({
      query: (args: { id: number }) => {
        return {
          url: `/mentor_profiles/${args.id}`,
          method: "GET",
        };
      },
    }),
    patchMentorProfile: builder.mutation<
      mentorResDto,
      { id: number; data: MentorProfilePatchDto }
    >({
      query: (args: { id: number; data: MentorProfilePatchDto }) => {
        return {
          url: `/mentor_profile/${args.id}`,
          method: "PATCH",
          data: args.data,
        };
      },
    }),
    postMentorProfile: builder.mutation<mentorResDto, { id: number }>({
      query: (args: { id: number }) => {
        return {
          url: `/mentor_profile/${args.id}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useGetAllMentorQuery,
  useGetOneMentorQuery,
  usePatchMentorProfileMutation,
} = mentorApi;
