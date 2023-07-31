import { Middleware } from "@reduxjs/toolkit";
import { signIn } from "@/RTK/Slices/Global";

const signInMiddleware: Middleware = (store) => (next) => (action) => {
  const currentState = store.getState();
  const ownerId = currentState.rootReducers.global.uId;

  if (ownerId === 0 && action.type !== signIn.type) {
    const id = localStorage.getItem("uid");
    if (id !== null) {
      store.dispatch(signIn(Number(id)));
    }
  }

  return next(action);
};

export default signInMiddleware;
