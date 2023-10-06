import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currMentorType {
  currMentor: MentorProfileDto;
  openMentorModal: boolean;
  openConnectModal: boolean;
}

const InitialState: currMentorType = {
  currMentor: {} as MentorProfileDto,
  openMentorModal: false,
  openConnectModal: false,
};

export const CurrMentorSlice = createSlice({
  name: "CurrMentor",
  initialState: InitialState,
  reducers: {
    setMentor(state, action: PayloadAction<MentorProfileDto>) {
      state.currMentor = action.payload;
    },
    openMentorModal(state) {
      state.openMentorModal = true;
    },
    closeMentorModal(state) {
      state.openMentorModal = false;
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
