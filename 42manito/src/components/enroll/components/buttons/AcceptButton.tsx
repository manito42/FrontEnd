import { usePatchReservationAcceptMutation } from "@/RTK/Apis/Enroll";
import { ReservationPatchAcceptDto } from "@/Types/Reservations/ReservationPatchAccept.dto";
import ConnectModal from "@/components/connect/ConnectModal";
import TextArea from "antd/es/input/TextArea";
import React, { useCallback, useState } from "react";

interface AcceptButtonProps {
  data: ReservationPatchAcceptDto;
  message: string;
}

const AcceptButton = ({ data, message }: AcceptButtonProps) => {
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
        >
          <div className="flex-row w-[100%] justify-center items-center">
            <div className="w-full flex-wrap justify-center items-center h-auto mt-3 md:mt-12">
              <div className="w-full justify-start text-xl font-bold mr-5">
                {"요청메시지"}
              </div>
              <TextArea value={message} className="w-full max-w[500px]" />
            </div>
          </div>
        </ConnectModal>
      )}
    </div>
  );
};

export default AcceptButton;
