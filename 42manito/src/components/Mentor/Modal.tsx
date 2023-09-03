import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { RootState, useAppDispatch } from "@/RTK/store";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { usePostReservationRequestMutation } from "@/RTK/Apis/Enroll";
import { initMentorConnect } from "@/RTK/Slices/MentorConnect";
import ConnectModal from "../Connect/ConnectModal";
import UserProfile from "@/components/Profile/UserProfile";

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
  const openMentorModal = useSelector(
    (state: RootState) => state.rootReducers.currMentor.openMentorModal,
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
      // FIXME: 이미 예약이 존재할 경우 409 처리가 되지 않음.
      await postReservation({
        mentorId: userId,
        menteeId: Owner,
        categoryId: connectState.categoryId, // 카테고리 선택할 수 있게 해야함
        requestMessage: connectState.message, // 요청 메세지
        hashtags: connectState.hashtags, // 해시태그
      });
      handleConnectClose();
    }
  };

  return (
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
        <button className="close-btn" onClick={handleZoomOut}>
          X
        </button>
        {
          <UserProfile
            UserId={userId}
            additions={
              <div className="connect-btn-container">
                {Owner !== 0 &&
                  Owner !== currentMentorState.currMentor.user.id && (
                    <button
                      className="connect-btn"
                      type="button"
                      onClick={() => handleConnectOpen()}
                    >
                      Connect
                    </button>
                  )}
              </div>
            }
          />
        }
      </section>
      {currentMentorState.openConnectModal && (
        <ConnectModal
          message="멘토에게 커넥트 요청을 보내시겠습니까?"
          onClose={handleConnectClose}
          handleYes={handleYes}
        />
      )}
    </div>
  );
};

export default MentorModal;
