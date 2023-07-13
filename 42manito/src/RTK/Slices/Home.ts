import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeStateType {
  zoomOut: boolean;
  openConnectModal: boolean;
}

const InitialState: homeStateType = {
  zoomOut: false,
  openConnectModal: false,
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState: InitialState,
  reducers: {
    handleZoomOut(state, action: PayloadAction<boolean>) {
      state.zoomOut = action.payload;
    },
    openConnectModal(state) {
      state.openConnectModal = true;
    },
    closeConnectModal(state) {
      state.openConnectModal = false;
    },
    initState(state) {
      state = InitialState;
    },
  },
});
