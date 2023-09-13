import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { useEffect } from "react";
import { RootState } from "@/RTK/store";
import { useDispatch, useSelector } from "react-redux";
import { useModalOpenClose } from "./modalOpenClose";

export const useConnectModal = () => {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useDispatch();
  const openConnectModal = currMentorState.openConnectModal;
  const { handleConnectModalClose } = useModalOpenClose();

  const handleZoomOut = () => {
    dispatch(CurrMentorSlice.actions.handleFocus(true));
    setTimeout(() => {
      dispatch(CurrMentorSlice.actions.handleFocus(false));
      handleConnectModalClose();
    }, 200);
  };

  const handlePopState = (event: PopStateEvent) => {
    if (event.state?.modal === "connect") {
      dispatch(CurrMentorSlice.actions.openConnectModal());
    }
  };

  useEffect(() => {
    if (openConnectModal) {
      window.addEventListener("popstate", handleZoomOut);

      return () => {
        window.removeEventListener("popstate", handleZoomOut);
      };
    }

    if (!openConnectModal) {
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [openConnectModal]);

  return { openConnectModal };
};
