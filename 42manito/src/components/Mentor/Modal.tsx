import { RootState, useAppDispatch } from "@/RTK/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { usePostReservationRequestMutation } from "@/RTK/Apis/Reservation";
import { initMentorConnect } from "@/RTK/Slices/MentorConnect";
import ConnectModal from "../Connect/ConnectModal";
import UserProfile from "@/components/Profile/UserProfile";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";

const MentorModal = () => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const dispatch = useAppDispatch();
  const currentMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );

  const mentorId = currentMentorState.currMentor.user.id;
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const connectState = useSelector(
    (state: RootState) => state.rootReducers.mentorConnect
  );

  const [postReservation] = usePostReservationRequestMutation();

  const handleZoomOut = () => {
    if (currentMentorState.openConnectModal) {
      dispatch(CurrMentorSlice.actions.closeConnectModal());
      return;
    }
    setCloseAnimation(true);
    setTimeout(() => {
      setCloseAnimation(false);
      dispatch(CurrMentorSlice.actions.closeMentorModal());
    }, 300);
  };

  const handleConnectOpen = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    dispatch(initMentorConnect());
    dispatch(CurrMentorSlice.actions.openConnectModal());
  };

  const handleYes = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (connectState.categoryId === 0) {
      alert("카테고리를 선택해주세요.");
    } else if (
      connectState.message.length === 0 ||
      connectState.hashtags.length <= 0
    ) {
      alert("요청 메세지와 해시태그를 입력해주세요.");
    } else {
      try {
        await postReservation({
          mentorId: mentorId,
          menteeId: userId,
          categoryId: connectState.categoryId, // 카테고리 선택할 수 있게 해야함
          requestMessage: connectState.message, // 요청 메세지
          hashtags: connectState.hashtags, // 해시태그
        }).unwrap();
        alert("예약이 완료되었습니다.");
      } catch (e: BaseQueryError<any>) {
        if (e.status === 409) {
          alert("이미 예약이 완료된 멘토입니다.");
        } else {
          alert("예약이 실패하였습니다.");
        }
      }
      dispatch(CurrMentorSlice.actions.closeConnectModal());
    }
  };

  return (
    <>
      <div
        className="mentor-modal-container"
        id="wrapper"
        onClick={handleZoomOut}
      >
        <section
          className={`mentor-modal-section ${
            closeAnimation ? "close-modal" : "open-modal"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {
            <UserProfile UserId={mentorId}>
              <div className="connect-btn-container">
                <button
                  className="connect-btn"
                  type="button"
                  onClick={() => handleConnectOpen()}
                >
                  멘토링 요청
                </button>
              </div>
              <button className="close-btn" onClick={handleZoomOut}>
                닫기
              </button>
            </UserProfile>
          }
        </section>
      </div>
      {currentMentorState.openConnectModal && (
        <ConnectModal handleYes={handleYes} />
      )}
    </>
  );
};

export default MentorModal;
