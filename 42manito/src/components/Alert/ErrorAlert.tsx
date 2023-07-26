import React from "react";

interface Props {
  msg: string;
  isAlert: boolean;
  close: () => void;
}

const ErrorAlert = ({ msg, isAlert, close }: Props) => {
  if (isAlert === false) return null;

  return (
    <div className="bg-red-50 border border-red-400 rounded text-red-800 text-sm p-4 flex items-start">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="w-full">
        <p>
          <span className="font-bold">Error:</span>
          <span className="ml-1">{msg}</span>
        </p>
        <button className="border-red-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold">
          확인
        </button>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default ErrorAlert;
