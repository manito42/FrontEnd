import { usePatchReservationPendingMutation } from "@/RTK/Apis/Enroll";
import { ReservationPatchMentorCompletionDto } from "@/Types/Reservations/ReservationPatchMentorCompletion.dto";
import ConnectModal from "@/components/Connect/ConnectModal";
import MuiRate from "@/components/Global/MuiRate";
import React, { useCallback, useEffect, useState } from "react";

interface FinishButtonProps {
  data: number;
}

const FinishButton = ({ data }: FinishButtonProps) => {
  const [onConnectModal, setOnConnectModal] = useState<boolean>(false);
  const [pending] = usePatchReservationPendingMutation();
  const [rating, setRating] = useState<number>(0);

  const openConnectModal = () => {
    setOnConnectModal(true);
  };

  const handleYes = useCallback(() => {
    if (rating === 0) {
      alert("평점을 입력해주세요.");
    } else {
      pending({ id: data, rating: rating });
      setOnConnectModal(false);
    }
  }, [data]);

  const closeConnectModal = useCallback(() => {
    setOnConnectModal(false);
  }, []);

  const handleRating = (rating: number) => {
    setRating(rating);
  };

  return (
    <div className="mt-4">
      {/* <Link href={`/Feedback?isFinish=${true}&id=${data}`}> */}
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={openConnectModal}
      >
        완료
      </button>
      {onConnectModal && (
        <ConnectModal
          message="멘토링을 완료하시겠습니까?"
          onClose={closeConnectModal}
          handleYes={handleYes}
        >
          <div className="flex-row w-[100%] justify-center items-center">
            <MuiRate
              Value={rating}
              setValue={handleRating}
              IsReadOnly={false}
            />
          </div>
        </ConnectModal>
      )}
    </div>
  );
};

export default FinishButton;
