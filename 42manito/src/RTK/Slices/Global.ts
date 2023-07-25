import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    signIn(state, action: PayloadAction<globalState>) {
      state.uId = action.payload.uId;
    },
    signOut(state) {
      state = InitialState;
    },
  },
});

export const { signIn, signOut } = GlobalSlice.actions;
