import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationPatchAcceptDto } from "@/Types/Reservations/ReservationPatchAccept.dto";
import { ReservationPatchCancelReqDto } from "@/Types/Reservations/ReservationPatchCancelReq.dto";
import { ReservationPatchMenteeCompletionDto } from "@/Types/Reservations/ReservationPatchMenteeCompletion.dto";
import { ReservationPatchMentorCompletionDto } from "@/Types/Reservations/ReservationPatchMentorCompletion.dto";
import { ReservationPostDto } from "@/Types/Reservations/ReservationPost.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ReservationPatchMenteeCheckReqDto } from "@/Types/Reservations/ReservationPatchMenteeCheckReq.dto";
import { ReservationGetResDto } from "@/Types/Reservations/ReservationGetRes.dto";
import { ReservationGetReqDto } from "@/Types/Reservations/ReservationGetReq.dto";
import { ObjectToURLString } from "@/utils/ObjectToURLString";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["Reservation"],
  endpoints: (builder) => ({
    // request = REQUEST, ACCEPT, MENTEE_CHECKED
    getReservations: builder.query<ReservationGetResDto, ReservationGetReqDto>({
      query: (request: ReservationGetReqDto) => {
        const query = ObjectToURLString(request.query);
        return {
          url: `/users/${request.id}/reservations${query}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    getReservation: builder.query<ReservationDefaultDto, number>({
      query: (id: number) => {
        return {
          url: `/reservations/${id}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    /** 처음 멘토링 신청을 보낼때 */
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
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    /** 멘토가 멘토링 수락 */
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
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    /** 예약 취소 */
    patchReservationCancel: builder.mutation<
      ReservationDefaultDto,
      ReservationPatchCancelReqDto
    >({
      query: (args: ReservationPatchCancelReqDto) => {
        return {
          url: `/reservations/${args.id}/cancel`,
          method: "PATCH",
          data: {content: args.content},
        };
      },
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    /** 멘티 확인 */
    patchReservationMenteeCheck: builder.mutation<
      ReservationDefaultDto,
      ReservationPatchMenteeCheckReqDto
    >({
      query: (args: ReservationPatchCancelReqDto) => {
        return {
          url: `/reservations/${args.id}/check`,
          method: "PATCH",
        };
      },
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    // mentee가 피드백 버튼을 누르면 하는 곳
    patchReservationMenteeFeedback: builder.mutation<
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
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    patchReservationMentorFeedback: builder.mutation<
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
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useGetReservationQuery,
  usePostReservationRequestMutation,
  usePatchReservationAcceptMutation,
  usePatchReservationCancelMutation,
  usePatchReservationMenteeCheckMutation,
  usePatchReservationMenteeFeedbackMutation,
  usePatchReservationMentorFeedbackMutation,
} = reservationApi;
