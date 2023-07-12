import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface globalState {
  uId: number | undefined;
  accessToken: string | undefined;
}

const InitialState: globalState = {
  uId: undefined,
  accessToken: undefined,
};

export const GlobalSlice = createSlice({
  name: "Global",
  initialState: InitialState,
  reducers: {
    signIn(state, action: PayloadAction<globalState>) {
      state.uId = action.payload.uId;
      state.accessToken = action.payload.accessToken;
    },
    signOut(state) {
      state = InitialState;
    },
  },
});
