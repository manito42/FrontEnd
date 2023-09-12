import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { useDispatch } from "react-redux";

export const useModalOpenClose = () => {
  const dispatch = useDispatch();

  const handleMentorModalOpen = () => {
    window.history.pushState(null, "", "");
    dispatch(CurrMentorSlice.actions.openMentorModal());
  };

  const handleConnectModalOpen = () => {
    window.history.pushState(null, "", "");
    dispatch(CurrMentorSlice.actions.openConnectModal());
  };

  const handleMentorModalClose = () => {
    dispatch(CurrMentorSlice.actions.closeMentorModal());
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
