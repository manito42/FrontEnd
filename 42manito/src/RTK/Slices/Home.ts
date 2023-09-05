import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeStateType {
  zoomOut: boolean;
  openConnectModal: boolean;
  allMentor: MentorProfileDto[] | undefined;
}

const InitialState: homeStateType = {
  zoomOut: false,
  openConnectModal: false,
  allMentor: undefined,
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState: InitialState,
  reducers: {
    addAllMentor(state, action: PayloadAction<MentorProfileDto[]>) {
      if (state.allMentor === undefined) {
        state.allMentor = [];
      }
      state.allMentor = [...state.allMentor, ...action.payload];
    },
    setAllMentor(state, action: PayloadAction<MentorProfileDto[]>) {
      state.allMentor = [...action.payload];
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
      state.allMentor = undefined;
    },
    initState(state) {
      state = InitialState;
    },
  },
});

export const {
  addAllMentor,
  setAllMentor,
  handleZoomOut,
  openConnectModal,
  closeConnectModal,
  initAllMentor,
} = HomeSlice.actions;
