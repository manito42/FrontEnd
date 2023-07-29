import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EnrollStateType {
  Reservations: ReservationDefaultDto[];
}

const InitialState: EnrollStateType = {
  Reservations: [],
};

export const EnrollSlice = createSlice({
  name: "Enroll",
  initialState: InitialState,
  reducers: {
    setReservations(state, action: PayloadAction<ReservationDefaultDto[]>) {
      state.Reservations = [...state.Reservations, ...action.payload];
    },
    initReservations(state) {
      state = InitialState;
    },
  },
});

export const { setReservations, initReservations } = EnrollSlice.actions;
