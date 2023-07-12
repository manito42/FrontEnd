import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { feedbackApi } from "./Apis/Feedback";
import { hashtagApi } from "./Apis/Hashtag";
import { mentorApi } from "./Apis/Mentor";
import { reservationApi } from "./Apis/Reservation";
import { userApi } from "./Apis/User";
import { rootReducer } from "./rootReducer";
import { GlobalSlice } from "./Slices/Global";

export const store = configureStore({
  reducer: {
    rootReducers: rootReducer,
    [userApi.reducerPath]: userApi.reducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
    [hashtagApi.reducerPath]: hashtagApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(mentorApi.middleware)
      .concat(hashtagApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(reservationApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
