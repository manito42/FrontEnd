import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface globalState {
  uId: number | null;
  isSidebarOpen: boolean;
}

const InitialState: globalState = {
  uId: null,
  isSidebarOpen: false,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState: InitialState,
  reducers: {
    signIn(state, action: PayloadAction<number | null>) {
      state.uId = action.payload;
    },
    signOut(state) {
      state = InitialState;
    },
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
  },
});

export const { signIn, signOut, openSidebar, closeSidebar } =
  GlobalSlice.actions;
