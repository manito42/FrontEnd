import { ReservationGetDto } from "@/Types/Reservations";
import Layout from "@/components/layout/Layout";
import React, { useState } from "react";

interface props {
  isVisible: boolean;
  onClose: () => void;
  data: ReservationGetDto;
}

const FeedbackPost = ({ isVisible, onClose }: props) => {
  const [focus, setFocus] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleFocusOut = () => {
    setFocus(true);
    setTimeout(() => {
      onClose();
      setFocus(false);
    }, 200);
  };

  const handleDisabled = () => {
    setDisabled(true);
    setDisabled(false);
  };

  const handleFeedback = () => {
    handleDisabled();
    // TODO: 커넥트요청하기
    // handleFocusOut();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-20"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`relative py-16 mt-24 connect-modal${
          focus && "close-connect-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-600 w-[60vw] h-[50vh]  mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-row m-5 justify-around">
                <button
                  className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleFeedback}
                >
                  Yes
                </button>
                <button
                  className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleFocusOut}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPost;
