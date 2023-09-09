import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userApi } from "./Apis/User";
import { rootReducer } from "./rootReducer";
import { homeApi } from "./Apis/Home";
import { categoryApi } from "./Apis/Category";
import { authApi } from "./Apis/Auth";
import { reservationApi } from "./Apis/Reservation";
import { searchApi } from "./Apis/Search";
import signInMiddleware from "./Middleware/signInMiddleware";
import { hashtagApi } from "@/RTK/Apis/Hashtag";

export const makeServerStore = () => {
  const store = configureStore({
    reducer: {
      rootReducers: rootReducer,
      [userApi.reducerPath]: userApi.reducer,
      [homeApi.reducerPath]: homeApi.reducer,
      [hashtagApi.reducerPath]: hashtagApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [reservationApi.reducerPath]: reservationApi.reducer,
      [searchApi.reducerPath]: searchApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(homeApi.middleware)
        .concat(hashtagApi.middleware)
        .concat(categoryApi.middleware)
        .concat(authApi.middleware)
        .concat(reservationApi.middleware)
        .concat(searchApi.middleware)
        .prepend(signInMiddleware),
  });
  return store;
};

export const store = makeServerStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
