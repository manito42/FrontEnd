import React, { useState } from "react";

interface Props {
  viewConnectModal: boolean;
  onClose: () => void;
}

const ConnectModal = ({ viewConnectModal, onClose }: Props) => {
  const [focus, setFocus] = useState(false);

  if (viewConnectModal === false) return null;

  const handleFocusOut = () => {
    setFocus(true);
    setTimeout(() => {
      onClose();
      setFocus(false);
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full p-20"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`relative py-16 mt-24 connect-modal ${
          focus && "close-connect-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-3xl absolute top-0 right-5 -mb-5"
          onClick={handleFocusOut}
        >
          X
        </button>
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-600 w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="text-center mt-5">
                <h3 className="text-4xl font-semibold leading-normal">
                  Are you sure?
                </h3>
              </div>
              <div className="flex flex-row m-5 justify-around">
                <button
                  className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
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

export default ConnectModal;
