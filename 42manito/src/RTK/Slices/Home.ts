import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeStateType {
  zoomOut: boolean;
  openConnectModal: boolean;
  allMentor: MentorProfileDto[];
}

const InitialState: homeStateType = {
  zoomOut: false,
  openConnectModal: false,
  allMentor: [],
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState: InitialState,
  reducers: {
    setAllMentor(state, action: PayloadAction<MentorProfileDto[]>) {
      state.allMentor = [...state.allMentor, ...action.payload];
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
    initAllMentor(state) {
      state.allMentor = [];
    },
    initState(state) {
      state = InitialState;
    },
  },
});

export const {
  setAllMentor,
  handleZoomOut,
  openConnectModal,
  closeConnectModal,
  initAllMentor,
} = HomeSlice.actions;
