import React from "react";

interface Props {
  msg: string;
  isAlert: boolean;
  close: () => void;
}

const InfoAlert = ({ msg, isAlert, close }: Props) => {
  if (isAlert === false) return null;

  return (
    <div className="top-0 justify-center flex items-center">
      <div className="bg-blue-50 border border-blue-400 rounded text-blue-800 text-sm p-4 flex w-full">
        <div className="w-full">
          <p>
            <span className="font-bold">Info:</span>
            <span className="ml-1">{msg}</span>
          </p>
        </div>
        <div>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
          <div>
            <button
              className="border-blue-400 bg-white hover:bg-gray-50 mt-4 border rounded font-bold w-[60px] h-[40px]"
              onClick={close}
            >
              <p>확인</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
