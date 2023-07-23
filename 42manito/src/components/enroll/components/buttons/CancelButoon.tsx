import { usePatchReservationCancelMutation } from "@/RTK/Apis/Enroll";
import { ReservationPatchCancelReqDto } from "@/Types/Reservations/ReservationPatchCancelReq.dto";
import ConnectModal from "@/components/conect/ConnectModal";
import React, { useCallback, useState } from "react";

interface CancelButtonProps {
  data: ReservationPatchCancelReqDto;
  isVisible: boolean;
}

const CancelButton = ({ data, isVisible }: CancelButtonProps) => {
  const [cancel] = usePatchReservationCancelMutation();
  const [onConnectModal, setOnConnectModal] = useState<boolean>(false);

  const openConnectModal = () => {
    setOnConnectModal(true);
  };

  const handleYes = useCallback(() => {
    cancel({ id: data.id });
    setOnConnectModal(false);
  }, [data.id]);

  const closeConnectModal = useCallback(() => {
    setOnConnectModal(false);
  }, []);

  if (!isVisible) return null;
  return (
    <div className="mt-4">
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={openConnectModal}
      >
        취소
      </button>
      {onConnectModal && (
        <ConnectModal
          message="취소하시겠습니까?"
          onClose={closeConnectModal}
          handleYes={handleYes}
        />
      )}
    </div>
  );
};

export default CancelButton;
