import { ReservationGetDto } from "@/Types/Reservations";
import React from "react";

interface CancelButtonProps {
  data: ReservationGetDto;
  isVisible: boolean;
}

const CancelButton = ({ data, isVisible }: CancelButtonProps) => {
  if (!isVisible) return null;

  const handleCancel = () => {
    // TODO : 취소 로직
  };

  return (
    <div className="mt-4">
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleCancel}
      >
        취소
      </button>
    </div>
  );
};

export default CancelButton;
