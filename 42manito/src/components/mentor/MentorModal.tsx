import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { RootState, useAppDispatch } from "@/RTK/store";
import Image from "next/image";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import ConnectModal from "../conect/ConnectModal";

const MentorModal = () => {
  const dispatch = useAppDispatch();
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "wrapper") handleZoomOut();
  };

  const handleZoomOut = () => {
    dispatch(CurrMentorSlice.actions.handleZoomOut(true));
    setTimeout(() => {
      dispatch(CurrMentorSlice.actions.closeMentorModal());
      dispatch(CurrMentorSlice.actions.handleZoomOut(false));
      dispatch(CurrMentorSlice.actions.deleteMentor());
    }, 300); // 줌아웃 에니메이션 실행 시간을 기다림
  };

  const handleConnectOpen = () => {
    dispatch(CurrMentorSlice.actions.openConnectModal());
  };

  const handleConnectClose = useCallback(() => {
    dispatch(CurrMentorSlice.actions.closeConnectModal());
  }, [dispatch]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-[100vw] px-5 md:px-20 h-[100vh]"
      id="wrapper"
      onClick={handleClose}
    >
      <section
        className={`relative py-16 mentor-modal h-[100vh] top-24 md:top-32 ${
          currMentorState.zoomOut && "close-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-5xl absolute top-0 right-5 -mb-5"
          onClick={handleZoomOut}
        >
          X
        </button>
        <div className="relative flex z-[1000] w-full justify-center items-center">
          <Image
            alt="..."
            src={currMentorState.currMentor.user.profileImage}
            className="shadow-xl rounded-full align-middle border-none -m-16 lg:ml-6 ml-1"
            width={180}
            height={180}
          />
        </div>
        <div className="px-4">
          <div
            className="relative flex flex-col break-words bg-white dark:bg-slate-700 w-[95vw] md:w-[90vw] h-[50vh] md:mb-6 shadow-xl rounded-lg p-3 md:p-10 overflow-y-scroll"
            id="mentorModal"
          >
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"></div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleConnectOpen()}
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1" id="Count">
                  {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <h1 className="text-xl font-bold block uppercase tracking-wide">
                        19
                      </h1>
                      <h1 className="text-sm text-blueGray-400">Month.</h1>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <h1 className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        2345
                      </h1>
                      <h1 className="text-sm text-blueGray-400">Total.</h1>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="text-center mt-28">
                <h2 className="text-4xl font-semibold leading-normal text-blueGray-700">
                  {currMentorState.currMentor.user.nickname}
                </h2>
              </div>
              <div className="mt-10 py-10 border-t dark:border-slate-300  border-slate-700 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {currMentorState.currMentor.description}
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
                  {currMentorState.currMentor.hashtags.map((aTag) => (
                    <h6
                      className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30"
                      key={aTag.id}
                    >
                      {aTag.name}
                    </h6>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {currMentorState.openConnectModal && (
        <ConnectModal
          message="멘토에게 커넥트 요청을 보내시겠습니까?"
          onClose={handleConnectClose}
        />
      )}
    </div>
  );
};

export default MentorModal;
