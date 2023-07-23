import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userApi } from "./Apis/User";
import { rootReducer } from "./rootReducer";
import { homeApi } from "./Apis/Home";
import { categoryApi } from "./Apis/Category";
import { authApi } from "./Apis/Auth";
import { enrollApi } from "./Apis/Enroll";

export const store = configureStore({
  reducer: {
    rootReducers: rootReducer,
    [userApi.reducerPath]: userApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [enrollApi.reducerPath]: enrollApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(homeApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware)
      .concat(enrollApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
