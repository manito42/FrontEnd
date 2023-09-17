import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface globalState {
  uId: number | null;
}

const InitialState: globalState = {
  uId: null,
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
  },
});

export const { signIn, signOut } = GlobalSlice.actions;
