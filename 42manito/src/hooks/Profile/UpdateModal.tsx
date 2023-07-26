import { useState, useCallback, useEffect } from "react";

export const useProfileUpdateModal = () => {
  const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);

  const openProfileUpdate = () => {
    setIsProfileUpdateOpen(true);
  };

  const closeProfileUpdate = useCallback(() => {
    setIsProfileUpdateOpen(false);
  }, []);

  useEffect(() => {
    if (isProfileUpdateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isProfileUpdateOpen]);

  return { isProfileUpdateOpen, openProfileUpdate, closeProfileUpdate };
};
