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
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
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
    <div className="mentor-modal-container" id="wrapper" onClick={handleClose}>
      <section
        className={`mentor-modal-section ${
          currMentorState.zoomOut && "close-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleZoomOut}>
          X
        </button>
        <div className="mentor-image-container">
          <Image
            alt="..."
            src={currMentorState.currMentor.user.profileImage}
            className="mentor-image"
            width={180}
            height={180}
          />
        </div>
        <div className="px-4">
          <div className="mentor-modal-content" id="mentorModal">
            <div className="px-6">
              <div className="mentor-modal-top-contents">
                <div className="connect-btn-container">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    {Owner !== 0 &&
                      Owner !== currMentorState.currMentor.user.id && (
                        <button
                          className="connect-btn"
                          type="button"
                          onClick={() => handleConnectOpen()}
                        >
                          Connect
                        </button>
                      )}
                  </div>
                </div>
                <div className="mentoring-count-container" id="Count">
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
              <div className="mentor-nickname-container">
                <h2 className="mentor-nickname">
                  {currMentorState.currMentor.user.nickname}
                </h2>
              </div>
              <div className="mentor-modal-bottom-contents">
                <div className="mentor-description-container">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mentor-description">
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
                <div className="mentor-hashtag-container">
                  {currMentorState.currMentor.hashtags.map((aTag) => (
                    <h6 className="mentor-hashtag" key={aTag.id}>
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
