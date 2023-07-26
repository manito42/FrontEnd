import { usePatchReservationCompleteMutation } from "@/RTK/Apis/Enroll";
import ConnectModal from "@/components/Connect/ConnectModal";
import MuiRate from "@/components/Global/MuiRate";
import { Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";

interface FinishButtonProps {
  data: number;
}

const PendingButton = ({ data }: FinishButtonProps) => {
  const [onConnectModal, setOnConnectModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [complete] = usePatchReservationCompleteMutation();

  const openConnectModal = () => {
    setOnConnectModal(true);
  };

  const handleYes = () => {
    if (rating === 0 || content === "") {
      alert("평점 또는 피드백 메시지를 입력해주세요.");
    } else {
      complete({ id: data, rating: rating, content: content });
      setOnConnectModal(false);
    }
  };

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
        피드백
      </button>

      {onConnectModal && (
        <ConnectModal
          message="피드백을 완료하시겠습니까?"
          onClose={closeConnectModal}
          handleYes={handleYes}
        >
          <div className="flex-row w-[100%] justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <MuiRate
                Value={rating}
                setValue={handleRating}
                IsReadOnly={false}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <Input.TextArea
                showCount
                maxLength={300}
                style={{ height: 80, marginBottom: 24 }}
                onChange={(e) => setContent(e.target.value)}
                placeholder="최대 300글자"
              />
            </div>
          </div>
        </ConnectModal>
      )}
    </div>
  );
};

export default PendingButton;
