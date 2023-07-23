import { usePatchReservationAcceptMutation } from "@/RTK/Apis/Enroll";
import { ReservationPatchAcceptDto } from "@/Types/Reservations/ReservationPatchAccept.dto";
import ConnectModal from "@/components/conect/ConnectModal";
import React, { useCallback, useState } from "react";

interface AcceptButtonProps {
  data: ReservationPatchAcceptDto;
  isVisible: boolean;
}

const AcceptButton = ({ data, isVisible }: AcceptButtonProps) => {
  const [accept] = usePatchReservationAcceptMutation();
  const [onConnectModal, setOnConnectModal] = useState<boolean>(false);

  const handleAccept = () => {
    setOnConnectModal(true);
  };

  const handleYes = useCallback(async () => {
    await accept({ id: data.id });
    setOnConnectModal(false);
  }, [data.id]);

  const onClose = useCallback(() => {
    setOnConnectModal(false);
  }, []);

  if (!isVisible) return null;
  return (
    <div className="mt-4">
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleAccept}
      >
        수락
      </button>
      {onConnectModal && (
        <ConnectModal
          message="멘토링을 수락하시겠습니까?"
          onClose={onClose}
          handleYes={handleYes}
        />
      )}
    </div>
  );
};

export default AcceptButton;
