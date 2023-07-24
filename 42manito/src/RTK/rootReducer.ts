import { combineReducers } from "redux";
import { CurrMentorSlice } from "./Slices/CurrMentor";
import { GlobalSlice } from "./Slices/Global";
import { HomeSlice } from "./Slices/Home";
import { ProfileUpdateSlice } from "./Slices/ProfileUpdate";
import { CategorySlice } from "./Slices/Category";
import { EnrollSlice } from "./Slices/Enroll";
import { SearchSlice } from "./Slices/Search";
import { MentorConnectSlice } from "./Slices/MentorConnect";

export const rootReducer = combineReducers({
  global: GlobalSlice.reducer,
  profileUpdate: ProfileUpdateSlice.reducer,
  home: HomeSlice.reducer,
  currMentor: CurrMentorSlice.reducer,
  category: CategorySlice.reducer,
  enroll: EnrollSlice.reducer,
  search: SearchSlice.reducer,
  mentorConnect: MentorConnectSlice.reducer,
});
