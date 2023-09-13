import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { useDispatch } from "react-redux";

export const useModalOpenClose = () => {
  const dispatch = useDispatch();

  const handleMentorModalOpen = () => {
    window.history.pushState({ modal: "mentor" }, "", "");
    dispatch(CurrMentorSlice.actions.openMentorModal());
  };

  const handleMentorModalClose = () => {
    dispatch(CurrMentorSlice.actions.closeMentorModal());
  };

  const handleConnectModalOpen = () => {
    window.history.pushState({ modal: "connect" }, "", "");
    dispatch(CurrMentorSlice.actions.openConnectModal());
  };

  const handleConnectModalClose = () => {
    dispatch(CurrMentorSlice.actions.closeConnectModal());
  };

  return {
    handleConnectModalOpen,
    handleMentorModalOpen,
    handleMentorModalClose,
    handleConnectModalClose,
  };
};
