import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    signIn(state, action: PayloadAction<number>) {
      state.uId = action.payload;
    },
    signOut(state) {
      state = InitialState;
    },
  },
});

export const { signIn, signOut } = GlobalSlice.actions;
