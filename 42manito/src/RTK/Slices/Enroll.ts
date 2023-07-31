import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationGetResDto } from "@/Types/Reservations/ReservationGetRes.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EnrollStateType {
  mentorReservation: ReservationDefaultDto[];
  menteeReservation: ReservationDefaultDto[];
}

const InitialState: EnrollStateType = {
  mentorReservation: [],
  menteeReservation: [],
};

export const EnrollSlice = createSlice({
  name: "Enroll",
  initialState: InitialState,
  reducers: {
    setMentorReservations(
      state,
      action: PayloadAction<ReservationDefaultDto[]>
    ) {
      state.mentorReservation = [...state.mentorReservation, ...action.payload];
    },
    setMenteeReservations(
      state,
      action: PayloadAction<ReservationDefaultDto[]>
    ) {
      state.menteeReservation = [...state.menteeReservation, ...action.payload];
    },
    initReservations(state) {
      state = InitialState;
    },
  },
});

export const {
  setMentorReservations,
  setMenteeReservations,
  initReservations,
} = EnrollSlice.actions;
