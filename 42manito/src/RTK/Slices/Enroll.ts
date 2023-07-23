import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EnrollStateType {
  mentorReservations: ReservationDefaultDto[];
  menteeReservations: ReservationDefaultDto[];
}

const InitialState: EnrollStateType = {
  mentorReservations: [],
  menteeReservations: [],
};

export const EnrollSlice = createSlice({
  name: "Enroll",
  initialState: InitialState,
  reducers: {
    setMentorReservations(
      state,
      action: PayloadAction<ReservationDefaultDto[]>
    ) {
      state.mentorReservations = [
        ...state.mentorReservations,
        ...action.payload,
      ];
    },
    setMenteeReservations(
      state,
      action: PayloadAction<ReservationDefaultDto[]>
    ) {
      state.menteeReservations = [
        ...state.menteeReservations,
        ...action.payload,
      ];
    },
  },
});

export const { setMentorReservations, setMenteeReservations } =
  EnrollSlice.actions;
