import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useRouter } from "next/router";
import { useModalOpenClose } from "./modalOpenClose";

export const useMentorModal = () => {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useDispatch();
  const isConnectModalOpen = currMentorState.openConnectModal;
  const isOpen = currMentorState.openMentorModal;
  const [closeAnimation, setCloseAnimation] = useState(false);
  const { handleMentorModalClose, handleConnectModalClose } =
    useModalOpenClose();

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

  const handleZoomOut = () => {
    console.log("handleZoomOut");
    if (isConnectModalOpen) {
      handleConnectModalClose();
      return;
    }
    setCloseAnimation(true);
    setTimeout(() => {
      setCloseAnimation(false);
      handleMentorModalClose();
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("popstate", handleZoomOut);
    }

    return () => {
      window.removeEventListener("popstate", handleZoomOut);
    };
  }, [isOpen]);

  return { currMentorState, handleZoomOut, closeAnimation };
};
