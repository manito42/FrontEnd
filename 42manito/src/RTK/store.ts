import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { feedbackApi } from "./Apis/Feedback";
import { hashtagApi } from "./Apis/Hashtag";
import { mentorApi } from "./Apis/Mentor";
import { reservationApi } from "./Apis/Reservation";
import { userApi } from "./Apis/User";
import { rootReducer } from "./rootReducer";
import { GlobalSlice } from "./Slices/Global";
import { homeApi } from "./Apis/Home";
import { categoryApi } from "./Apis/Category";
import { authApi } from "./Apis/Auth";

export const store = configureStore({
  reducer: {
    rootReducers: rootReducer,
    [userApi.reducerPath]: userApi.reducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
    [hashtagApi.reducerPath]: hashtagApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(mentorApi.middleware)
      .concat(hashtagApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(reservationApi.middleware)
      .concat(homeApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
