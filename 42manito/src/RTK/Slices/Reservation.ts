import { createSlice } from "@reduxjs/toolkit";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";

interface currMentorType {
  isModalOpen: boolean;
  selectedReservation: ReservationDefaultDto;
}

const InitialState: currMentorType = {
  isModalOpen: false,
  selectedReservation: {
    id: 0,
    mentorId: 0,
    menteeId: 0,
    category: {
      id: 0,
      name: "",
    },
    requestMessage: "",
    status: ReservationStatus.ACCEPT,
    hashtags: [],
    mentorFeedback: null,
    menteeFeedback: null,
    createdAt: "",
    updatedAt: "",
  },
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
