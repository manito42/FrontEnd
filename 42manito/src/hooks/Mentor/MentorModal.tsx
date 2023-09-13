import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useRouter } from "next/router";
import { useModalOpenClose } from "./modalOpenClose";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";

export const useMentorModal = () => {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useDispatch();
  const isConnectModalOpen = currMentorState.openConnectModal;
  const isOpen = currMentorState.openMentorModal;
  const { handleMentorModalClose } = useModalOpenClose();

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
  }, [currMentorState.openMentorModal]);

  const handleZoomOut = () => {
    dispatch(CurrMentorSlice.actions.handleZoomOut(true));
    setTimeout(() => {
      dispatch(CurrMentorSlice.actions.handleZoomOut(false));
      handleMentorModalClose();
    }, 300);
  };

  useEffect(() => {
    if (isOpen && !isConnectModalOpen) {
      window.addEventListener("popstate", handleZoomOut);

      return () => {
        window.removeEventListener("popstate", handleZoomOut);
      };
    }
  }, [isOpen, isConnectModalOpen]);

  return { currMentorState };
};
