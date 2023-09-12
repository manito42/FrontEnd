import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";

export const useMentorModal = () => {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (currMentorState.openMentorModal) {
      document.body.style.overflowY = "hidden";
      if (htmlElement) {
        htmlElement.style.overflowY = "hidden";
      }
    } else {
      document.body.style.overflowY = "unset";
      if (htmlElement) {
        htmlElement.style.overflowY = "unset";
      }
    }
  }, [currMentorState.openMentorModal, dispatch]);

  useEffect(() => {
    const handlePopStateEvent = (event: PopStateEvent) => {
      dispatch(CurrMentorSlice.actions.handlePopState(event));
    };
    window.addEventListener("popstate", handlePopStateEvent);

    return () => window.removeEventListener("popstate", handlePopStateEvent);
  }, []);

  return currMentorState;
};
