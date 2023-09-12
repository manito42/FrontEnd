import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

export const useModalOpenClose = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMentorModalOpen = () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    router
      .push({
        pathname: router.pathname,
        query: { ...router.query, mentorModal: "true" },
      })
      .then(() => {
        window.scrollTo(0, scrollPosition);
      });
    dispatch(CurrMentorSlice.actions.openMentorModal());
  };

  const handleConnectModalOpen = () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    router
      .push({
        pathname: router.pathname,
        query: { ...router.query, connectModal: "true" },
      })
      .then(() => {
        window.scrollTo(0, scrollPosition);
      });
    dispatch(CurrMentorSlice.actions.openConnectModal());
  };

  const handleMentorModalClose = () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    const newQuery = { ...router.query };
    delete newQuery.mentorModal;
    console.log(newQuery.mentorModal);

    router
      .replace({
        pathname: router.pathname,
        query: newQuery,
      })
      .then(() => {
        window.scrollTo(0, scrollPosition);
      });
    dispatch(CurrMentorSlice.actions.closeMentorModal());
  };

  const handleConnectModalClose = () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    const newQuery = { ...router.query };
    delete newQuery.connectModal;

    router
      .replace({
        pathname: router.pathname,
        query: newQuery,
      })
      .then(() => {
        window.scrollTo(0, scrollPosition);
      });
    dispatch(CurrMentorSlice.actions.closeConnectModal());
  };

  return {
    handleConnectModalOpen,
    handleMentorModalOpen,
    handleMentorModalClose,
    handleConnectModalClose,
  };
};
