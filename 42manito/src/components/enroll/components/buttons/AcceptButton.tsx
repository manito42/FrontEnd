import { ReservationGetDto } from "@/Types/Reservations";
import React from "react";

interface AcceptButtonProps {
  data: ReservationGetDto;
  isVisible: boolean;
}

const AcceptButton = ({ data, isVisible }: AcceptButtonProps) => {
  if (!isVisible) return null;

  const handleAccept = () => {
    // TODO : 수락 로직
  };

  return (
    <div className="mt-4">
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleAccept}
      >
        수락
      </button>
    </div>
  );
};

export default AcceptButton;
