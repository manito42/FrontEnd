import { MentorProfileDto } from "@/Types/MentorProfileDto";
import Image from "next/image";
import React, { useState } from "react";
import MuiRate from "../MuiRate";

interface props {
  onClose: () => void;
  isVisible: boolean;
  data: MentorProfileDto;
}

const MentorModal = ({ isVisible, onClose, data }: props) => {
  const [zoomOut, setZoomOut] = useState(false);
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "wrapper") onClose();
  };

  const handleZoomOut = () => {
    setZoomOut(true);
    setTimeout(() => {
      onClose();
      setZoomOut(false);
    }, 400); // 여기서 300ms는 줌아웃 애니메이션이 완료되기까지 기다리는 시간입니다.
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full p-20"
      id="wrapper"
      onClick={handleClose}
    >
      <section
        className={`relative py-16 mt-24 mentor-modal ${
          zoomOut && "close-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-5xl absolute top-0 right-5 -mb-5"
          onClick={handleZoomOut}
        >
          X
        </button>
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-600 w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <Image
                      alt="..."
                      src={data.profileImage}
                      className="shadow-xl rounded-full align-middle border-none -m-16 lg:ml-6 ml-1"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1" id="Count">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black dark:text-white">
                        19
                      </span>
                      <span className="text-sm text-blueGray-400">Month.</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        2345
                      </span>
                      <span className="text-sm text-blueGray-400">Total.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-28">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                  {data.nickname}
                </h3>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {data.description}
                    </p>
                  </div>
                </div>
                {/* <div className="w-full lg:w-full px-4">
                  <div>멘토링 평점</div>
                  <MuiRate IsReadOnly={true} Value={5.0} />
                  <div>멘티 평점</div>
                  <MuiRate IsReadOnly={true} Value={5.0} />
                </div> */}
                <div className="flex items-start mt-2 m-auto">
                  {data.hashtags.map((aTag) => (
                    <h1
                      className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30"
                      key={aTag.id}
                    >
                      {aTag.name}
                    </h1>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorModal;
