import { combineReducers } from "redux";
import { GlobalSlice } from "./Slices/Global";

export const rootReducer = combineReducers({
  global: GlobalSlice.reducer,
});
