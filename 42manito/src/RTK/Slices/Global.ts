import { createSlice } from "@reduxjs/toolkit";

interface globalState {
  uId: number;
}

const InitialState: globalState = {
  uId: 0,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState: InitialState,
  reducers: {
    signIn(state) {
      state.uId = localStorage.getItem("uId")
        ? Number(localStorage.getItem("uId"))
        : 0;
    },
    signOut(state) {
      state = InitialState;
    },
  },
});

export const { signIn, signOut } = GlobalSlice.actions;
