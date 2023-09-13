import { createSlice } from "@reduxjs/toolkit";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";

interface currMentorType {
  isModalOpen: boolean;
  selectedReservation: ReservationDefaultDto | null;
}

const InitialState: currMentorType = {
  isModalOpen: false,
  selectedReservation: null,
};

export const ReservationSlice = createSlice({
  name: "Reservation",
  initialState: InitialState,
  reducers: {
    openReservationModal(state, action) {
      state.selectedReservation = action.payload;
      state.isModalOpen = true;
    },
    closeReservationModal(state) {
      state.isModalOpen = false;
      state.selectedReservation = null;
    },
    setSelectedReservation(state, action) {
      state.selectedReservation = action.payload;
    },
  },
});

export const {
  openReservationModal,
  closeReservationModal,
  setSelectedReservation,
} = ReservationSlice.actions;
