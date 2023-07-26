import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { RootState, useAppDispatch } from "@/RTK/store";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConnectModal from "../Connect/ConnectModal";
import { usePostReservationRequestMutation } from "@/RTK/Apis/Enroll";
import MentorConnectSelect from "./ConnectSelect";
import { initMentorConnect, setMessage } from "@/RTK/Slices/MentorConnect";
import DevelopAnimation from "../Global/DevelopAnimation";
import HobbyAnimation from "../Global/HobbyAnimation";
import { Input } from "antd";
import classnames from "classnames";

const MentorModal = () => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const dispatch = useAppDispatch();
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const connectState = useSelector(
    (state: RootState) => state.rootReducers.mentorConnect
  );
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "wrapper") handleZoomOut();
  };

  const [postReservation] = usePostReservationRequestMutation();
  const handleZoomOut = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      setCloseAnimation(false);
      dispatch(CurrMentorSlice.actions.closeMentorModal());
    }, 300);
  };

  const handleConnectOpen = () => {
    dispatch(initMentorConnect());
    dispatch(CurrMentorSlice.actions.openConnectModal());
  };

  const handleConnectClose = useCallback(() => {
    dispatch(CurrMentorSlice.actions.closeConnectModal());
  }, [dispatch]);

  const handleYes = async () => {
    if (
      connectState.message.length === 0 ||
      connectState.hashtags.length <= 0
    ) {
      alert("요청 메세지와 해시태그를 입력해주세요.");
    } else {
      await postReservation({
        mentorId: currMentorState.currMentor.user.id,
        menteeId: Owner,
        categoryId: currMentorState.currMentor.categories[0].id, // 카테고리 선택할 수 있게 해야함
        requestMessage: connectState.message, // 요청 메세지
        hashtags: connectState.hashtags, // 해시태그
      });
      handleConnectClose();
    }
  };

  return (
    <div className="mentor-modal-container" id="wrapper" onClick={handleClose}>
      <section
        className={`mentor-modal-section ${
          closeAnimation ? "close-modal" : "mentor-modal"
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
          handleYes={handleYes}
        >
          <div className="flex-row w-[100%] justify-center items-center">
            <div className="w-full flex justify-center items-center">
              {currMentorState.currMentor.categories[0].name === "DEVELOP" ? (
                <DevelopAnimation size="20vw" />
              ) : (
                <HobbyAnimation size="20vw" />
              )}
            </div>
            <div className="w-full flex-wrap justify-center items-center h-auto mt-3 md:mt-12">
              <div className="w-full justify-start text-xl font-bold mr-5">
                {"해시태그선택"}
              </div>
              <MentorConnectSelect
                hashtag={currMentorState.currMentor.hashtags}
              />
            </div>
            <div className="w-full flex-wrap justify-center items-center h-auto mt-3 md:mt-5">
              <div className="text-xl font-bold">요청메시지</div>
              <Input.TextArea
                showCount
                maxLength={1000}
                style={{ height: 80, marginBottom: 24 }}
                onChange={(e) => dispatch(setMessage(e.target.value))}
                placeholder="최대 1000글자"
                className="w-full max-w-[500px]"
              />
            </div>
          </div>
        </ConnectModal>
      )}
    </div>
  );
};

export default MentorModal;
