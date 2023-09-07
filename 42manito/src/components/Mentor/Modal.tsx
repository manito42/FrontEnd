import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { RootState, useAppDispatch } from "@/RTK/store";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { usePostReservationRequestMutation } from "@/RTK/Apis/Enroll";
import { initMentorConnect } from "@/RTK/Slices/MentorConnect";
import ConnectModal from "../Connect/ConnectModal";
import UserProfile from "@/components/Profile/UserProfile";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";

const MentorModal = () => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const dispatch = useAppDispatch();
  const currentMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor,
  );

  const userId = currentMentorState.currMentor.user.id;
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const connectState = useSelector(
    (state: RootState) => state.rootReducers.mentorConnect,
  );
  const openConnectModal = useSelector(
    (state: RootState) => state.rootReducers.currMentor.openConnectModal,
  );

  const [postReservation] = usePostReservationRequestMutation();
  const handleZoomOut = () => {
    if (openConnectModal) {
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
    if (Owner === 0) {
      alert("로그인이 필요합니다.");
      return;
    }
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
      try {
        await postReservation({
          mentorId: userId,
          menteeId: Owner,
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
      handleConnectClose();
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
            closeAnimation ? "close-modal" : "mentor-modal"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {
            <UserProfile UserId={userId}>
              <div className="connect-btn-container">
                {
                  Owner !== currentMentorState.currMentor.user.id && (
                    <button
                      className="connect-btn"
                      type="button"
                      onClick={() => handleConnectOpen()}
                    >
                      멘토링 요청
                    </button>
                  )}
              </div>
              <button className="close-btn" onClick={handleZoomOut}>
                닫기
              </button>
            </UserProfile>
          }
        </section>
      </div>
      {currentMentorState.openConnectModal && (
        <ConnectModal
          message="멘토에게 커넥트 요청을 보내시겠습니까?"
          onClose={handleConnectClose}
          handleYes={handleYes}
        />
      )}
    </>
  );
};

export default MentorModal;
