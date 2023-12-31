import { createSlice } from "@reduxjs/toolkit";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";

interface currMentorType {
  isReservationModalOpen: boolean;
  isFeedbackModalOpen: boolean;
  isCancelModalOpen: boolean;
  isSocialLinkModalOpen: boolean;
  selectedReservation: ReservationDefaultDto;
}

const InitialState: currMentorType = {
  isReservationModalOpen: false,
  isFeedbackModalOpen: false,
  isCancelModalOpen: false,
  isSocialLinkModalOpen: false,
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
      state.isReservationModalOpen = true;
    },
    closeReservationModal(state) {
      state.isReservationModalOpen = false;
    },
    openFeedbackModal(state) {
      state.isFeedbackModalOpen = true;
    },
    closeFeedbackModal(state) {
      state.isFeedbackModalOpen = false;
    },
    openCancelModal(state) {
      state.isCancelModalOpen = true;
    },
    closeCancelModal(state) {
      state.isCancelModalOpen = false;
    },
    setSelectedReservation(state, action) {
      state.selectedReservation = action.payload;
    },
    openSocialLinkModal(state) {
      state.isSocialLinkModalOpen = true;
    },
    closeSocialLinkModal(state) {
      state.isSocialLinkModalOpen = false;
    },
  },
});

export const {
  openReservationModal,
  closeReservationModal,
  openFeedbackModal,
  closeFeedbackModal,
  openCancelModal,
  closeCancelModal,
  setSelectedReservation,
  openSocialLinkModal,
  closeSocialLinkModal,
} = ReservationSlice.actions;
