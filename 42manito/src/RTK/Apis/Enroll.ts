import { EnrollReqDto } from "@/Types/Enroll/EnrollReq.dto";
import { EnrollResDto } from "@/Types/Enroll/EnrollRes.dto";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationPatchAcceptDto } from "@/Types/Reservations/ReservationPatchAccept.dto";
import { ReservationPatchCancelReqDto } from "@/Types/Reservations/ReservationPatchCancelReq.dto";
import { ReservationPatchMenteeCompletionDto } from "@/Types/Reservations/ReservationPatchMenteeCompletion.dto";
import { ReservationPatchMentorCompletionDto } from "@/Types/Reservations/ReservationPatchMentorCompletion.dto";
import { ReservationPostDto } from "@/Types/Reservations/ReservationPost.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["Enroll"],
  endpoints: (builder) => ({
    // enroll REQUEST, ACCEPT, PENDING 만 가져오기
    getActiveMentorEnrollment: builder.mutation<
      ReservationDefaultDto[],
      EnrollReqDto
    >({
      query: (args: EnrollReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&active=${true}&as_mentor=${true}&as_mentee=${false}`,
          method: "GET",
        };
      },
    }),
    getActiveMenteeEnrollment: builder.mutation<
      ReservationDefaultDto[],
      EnrollReqDto
    >({
      query: (args: EnrollReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&active=${true}&as_mentor=${false}&as_mentee=${true}`,
          method: "GET",
        };
      },
    }),
    getAllMentorEnrollment: builder.mutation<
      ReservationDefaultDto[],
      EnrollReqDto
    >({
      query: (args: EnrollReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&as_mentor=${true}&as_mentee=${false}&active=${false}`,
          method: "GET",
        };
      },
    }),
    getAllMenteeEnrollment: builder.mutation<
      ReservationDefaultDto[],
      EnrollReqDto
    >({
      query: (args: EnrollReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&as_mentor=${false}&as_mentee=${true}&active=${false}`,
          method: "GET",
        };
      },
    }),
    // 처음 멘토링 신청을 보낼때
    postReservationRequest: builder.mutation<
      ReservationDefaultDto,
      ReservationPostDto
    >({
      query: (args: ReservationPostDto) => {
        return {
          url: `/reservations`,
          method: "POST",
          data: {
            mentorId: args.mentorId,
            menteeId: args.menteeId,
            categoryId: args.categoryId,
            requestMessage: args.requestMessage,
            hashtags: args.hashtags,
          },
        };
      },
      invalidatesTags: [{ type: "Enroll", id: "LIST" }],
    }),
    patchReservationAccept: builder.mutation<
      ReservationDefaultDto,
      ReservationPatchAcceptDto
    >({
      query: (args: ReservationPatchAcceptDto) => {
        return {
          url: `/reservations/${args.id}/accept`,
          method: "PATCH",
        };
      },
      invalidatesTags: [{ type: "Enroll", id: "LIST" }],
    }),
    patchReservationCancel: builder.mutation<
      ReservationDefaultDto,
      ReservationPatchCancelReqDto
    >({
      query: (args: ReservationPatchCancelReqDto) => {
        return {
          url: `/reservations/${args.id}/cancel`,
          method: "PATCH",
        };
      },
      invalidatesTags: [{ type: "Enroll", id: "LIST" }],
    }),
    // mentor가 완료버튼을 누르면 하는 곳
    patchReservationPending: builder.mutation<
      ReservationDefaultDto,
      ReservationPatchMentorCompletionDto
    >({
      query: (args: ReservationPatchMentorCompletionDto) => {
        return {
          url: `/reservations/${args.id}/mentor_completion`,
          method: "PATCH",
          data: { rating: args.rating },
        };
      },
      invalidatesTags: [{ type: "Enroll", id: "LIST" }],
    }),
    // mentee가 피드백 버튼을 누르면 하는 곳
    patchReservationComplete: builder.mutation<
      ReservationDefaultDto,
      ReservationPatchMenteeCompletionDto
    >({
      query: (args: ReservationPatchMenteeCompletionDto) => {
        return {
          url: `/reservations/${args.id}/mentee_completion`,
          method: "PATCH",
          data: { rating: args.rating, content: args.content },
        };
      },
      invalidatesTags: [{ type: "Enroll", id: "LIST" }],
    }),
  }),
});

export const {
  useGetActiveMentorEnrollmentMutation,
  useGetActiveMenteeEnrollmentMutation,
  useGetAllMenteeEnrollmentMutation,
  useGetAllMentorEnrollmentMutation,
  usePostReservationRequestMutation,
  usePatchReservationAcceptMutation,
  usePatchReservationCancelMutation,
  usePatchReservationPendingMutation,
  usePatchReservationCompleteMutation,
} = enrollApi;
