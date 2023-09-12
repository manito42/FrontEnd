import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { useEffect } from "react";
import { RootState } from "@/RTK/store";
import { useDispatch, useSelector } from "react-redux";

export const useConnectModal = () => {
  const openConnectModal = useSelector(
    (state: RootState) => state.rootReducers.currMentor.openConnectModal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleConnectPopStateEvent = (event: any) => {
      if (event.state && event.state.modal === "connect") {
        dispatch(CurrMentorSlice.actions.closeConnectModal());
        window.history.forward(); // Prevent the browser from going back in history
      }
    };

    const handlePopStateEvent = (event: PopStateEvent) =>
      dispatch(CurrMentorSlice.actions.handlePopState(event));

    window.addEventListener("popstate", handlePopStateEvent);

    return () => window.removeEventListener("popstate", handlePopStateEvent);
  }, [openConnectModal, dispatch]);

  return openConnectModal;
};
