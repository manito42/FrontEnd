import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currMentorType {
  currMentor: MentorProfileDto;
  openMentorModal: boolean;
  zoomOut: boolean;
  openConnectModal: boolean;
  modalStack: string[];
}

const InitialState: currMentorType = {
  currMentor: {} as MentorProfileDto,
  openMentorModal: false,
  zoomOut: false,
  openConnectModal: false,
  modalStack: [],
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
      state.modalStack.push("mentor");
      window.history.pushState(null, "");
    },
    closeMentorModal(state) {
      if (state.openMentorModal) {
        state.openMentorModal = false;
        const index = state.modalStack.lastIndexOf("mentor");
        if (index !== -1) {
          state.modalStack.splice(index, 1);
        }
      }
    },
    handleZoomOut(state, action: PayloadAction<boolean>) {
      state.zoomOut = action.payload;
    },
    openConnectModal(state) {
      state.openConnectModal = true;
      state.modalStack.push("connect");
      window.history.pushState(null, "");
    },
    closeConnectModal(state) {
      if (state.openConnectModal) {
        state.openConnectModal = false;
        const index = state.modalStack.lastIndexOf("connect");
        if (index !== -1) {
          state.modalStack.splice(index, 1);
        }
      }
    },
    handlePopState(state, action: PayloadAction<PopStateEvent>) {
      if (state.modalStack.length > 0) {
        const lastModal = state.modalStack.pop();
        console.log("Closing modal:", lastModal); // Add this line

        if (lastModal === "mentor") {
          state.openMentorModal = false;
        } else if (lastModal === "connect") {
          state.openConnectModal = false;
        }

        // Prevent the default back action
        window.history.pushState(null, "");
      }
    },
    deleteMentor(state) {
      state = InitialState;
    },
  },
});
