import { combineReducers } from "redux";
import { CurrMentorSlice } from "./Slices/CurrMentor";
import { GlobalSlice } from "./Slices/Global";
import { HomeSlice } from "./Slices/Home";
import { ProfileUpdateSlice } from "./Slices/ProfileUpdate";

export const rootReducer = combineReducers({
  global: GlobalSlice.reducer,
  profileUpdate: ProfileUpdateSlice.reducer,
  home: HomeSlice.reducer,
  currMentor: CurrMentorSlice.reducer,
});
