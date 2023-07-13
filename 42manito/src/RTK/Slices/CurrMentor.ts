import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currMentorType {
  currMentor: mentorResDto;
  openMentorModal: boolean;
  zoomOut: boolean;
  openConnectModal: boolean;
}

const InitialState: currMentorType = {
  currMentor: {} as mentorResDto,
  openMentorModal: false,
  zoomOut: false,
  openConnectModal: false,
};

export const CurrMentorSlice = createSlice({
  name: "CurrMentor",
  initialState: InitialState,
  reducers: {
    setMentor(state, action: PayloadAction<mentorResDto>) {
      state.currMentor = action.payload;
    },
    openMentorModal(state) {
      state.openMentorModal = true;
    },
    closeMentorModal(state) {
      state.openMentorModal = false;
    },
    handleZoomOut(state, action: PayloadAction<boolean>) {
      state.zoomOut = action.payload;
    },
    openConnectModal(state) {
      state.openConnectModal = true;
    },
    closeConnectModal(state) {
      state.openConnectModal = false;
    },
    deleteMentor(state) {
      state = InitialState;
    },
  },
});
