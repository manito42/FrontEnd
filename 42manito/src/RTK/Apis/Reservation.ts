import { UserReservationReqDto } from "@/Types/UserReservation/UserReservationReqDto";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationPatchAcceptDto } from "@/Types/Reservations/ReservationPatchAccept.dto";
import { ReservationPatchCancelReqDto } from "@/Types/Reservations/ReservationPatchCancelReq.dto";
import { ReservationPatchMenteeCompletionDto } from "@/Types/Reservations/ReservationPatchMenteeCompletion.dto";
import { ReservationPatchMentorCompletionDto } from "@/Types/Reservations/ReservationPatchMentorCompletion.dto";
import { ReservationPostDto } from "@/Types/Reservations/ReservationPost.dto";
import { BaseQuery } from "@/utils/BaseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { UserReservationResDto } from "@/Types/UserReservation/UserReservationResDto";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: BaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,
  }),
  tagTypes: ["Reservation"],
  endpoints: (builder) => ({
    // request = REQUEST, ACCEPT, MENTEE_CHECKED
    getRequestReservations: builder.query<
      UserReservationResDto,
      { id: number }
    >({
      query: ({ id }) => {
        return {
          url: `/users/${id}/reservations/request`,
          method: "GET",
        };
      },
    }),
    // active = NOT DONE, NOT CANCEL
    getActiveReservation: builder.query<
      UserReservationResDto,
      UserReservationReqDto
    >({
      query: (args: UserReservationReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&active=${true}&as_mentor=${true}&as_mentee=${false}`,
          method: "GET",
        };
      },
    }),
    getActiveMenteeReservation: builder.query<
      UserReservationResDto,
      UserReservationReqDto
    >({
      query: (args: UserReservationReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&active=${true}&as_mentor=${false}&as_mentee=${true}`,
          method: "GET",
        };
      },
    }),
    getAllMentorReservation: builder.query<
      UserReservationResDto,
      UserReservationReqDto
    >({
      query: (args: UserReservationReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&as_mentor=${true}&as_mentee=${false}&active=${false}`,
          method: "GET",
        };
      },
    }),
    getAllMenteeReservation: builder.query<
      UserReservationResDto,
      UserReservationReqDto
    >({
      query: (args: UserReservationReqDto) => {
        return {
          url: `/users/${args.id}/reservations?take=${args.take}&page=${
            args.page
          }&as_mentor=${false}&as_mentee=${true}&active=${false}`,
          method: "GET",
        };
      },
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
    patchReservationDone: builder.mutation<
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
  useGetRequestReservationsQuery,
  useGetActiveReservationQuery,
  useGetActiveMenteeReservationQuery,
  useGetAllMenteeReservationQuery,
  useGetAllMentorReservationQuery,
  usePostReservationRequestMutation,
  usePatchReservationAcceptMutation,
  usePatchReservationCancelMutation,
  usePatchReservationMenteeFeedbackMutation,
  usePatchReservationDoneMutation,
} = reservationApi;
