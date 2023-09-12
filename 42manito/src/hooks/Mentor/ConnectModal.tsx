import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { useEffect, useState } from "react";
import { RootState } from "@/RTK/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useModalOpenClose } from "./modalOpenClose";

export const useConnectModal = () => {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const openConnectModal = currMentorState.openConnectModal;
  const [closeAnimation, setCloseAnimation] = useState(false);
  const { handleConnectModalOpen, handleConnectModalClose } =
    useModalOpenClose();

  const handleZoomOut = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      setCloseAnimation(false);
      handleConnectModalClose();
    }, 200);
  };

  useEffect(() => {
    if (openConnectModal) {
      window.addEventListener("popstate", handleZoomOut);
    }

    return () => {
      window.removeEventListener("popstate", handleZoomOut);
    };
  }, [openConnectModal]);

  return { openConnectModal, handleZoomOut };
};
