import { FeedbackGetDto } from "@/Types/Feedback/FeedbackGetDto";
import { FeedbackPostDto } from "@/Types/Feedback/FeedbackPostDtp";
import customAxios from "@/utils/CustomAxios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

const feedbackBaseQuery =
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
      if (err.status === 409) {
        alert("이미 완료된 작업입니다.");
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: feedbackBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_MOC_URL}`,
  }),
  endpoints: (builder) => ({
    postMentorFeedback: builder.mutation<FeedbackGetDto, FeedbackPostDto>({
      query: (args: FeedbackPostDto) => {
        return {
          url: `/mentor_feedbacks`,
          method: "POST",
          data: args,
        };
      },
    }),
    getAllMentorFeedback: builder.query<
      FeedbackGetDto[],
      { take: number; page: number }
    >({
      // feedback Page에서는 getAllMenteeFeedback으로 해야함
      query: (args: { take: number; page: number }) => {
        return {
          url: `/mentor_feedbacks?take=${args.take}&page=${args.page}`,
          method: "GET",
        };
      },
    }),
    getOneMentorFeedback: builder.query<FeedbackGetDto, { id: number }>({
      query: (args: { id: number }) => {
        return {
          url: `/mentor_feedbacks/${args.id}`,
          method: "GET",
        };
      },
    }),
    postMenteeFeedback: builder.mutation<FeedbackGetDto, FeedbackPostDto>({
      query: (args: FeedbackPostDto) => {
        return {
          url: `/mentee_feedbacks`,
          method: "POST",
          data: args,
        };
      },
    }),
    getAllMenteeFeedback: builder.query<
      FeedbackGetDto[],
      { take: number; page: number }
    >({
      query: (args: { take: number; page: number }) => {
        return {
          url: `/mentee_feedbacks?take=${args.take}&page=${args.page}`,
          method: "GET",
        };
      },
    }),
    getOneMenteeFeedback: builder.query<FeedbackGetDto, { id: number }>({
      query: (args: { id: number }) => {
        return {
          url: `/mentee_feedbacks/${args.id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllMentorFeedbackQuery,
  useGetOneMentorFeedbackQuery,
  usePostMentorFeedbackMutation,
  useGetAllMenteeFeedbackQuery,
  useGetOneMenteeFeedbackQuery,
  usePostMenteeFeedbackMutation,
} = feedbackApi;
