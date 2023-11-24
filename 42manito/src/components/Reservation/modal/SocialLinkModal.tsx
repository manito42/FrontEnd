import { useDispatch, useSelector } from "react-redux";
import { closeSocialLinkModal } from "@/RTK/Slices/Reservation";
import { useEffect, useState } from "react";
import { Button } from "@/common";
import { ButtonType } from "@/Types/General/ButtonType";
import { RootState } from "@/RTK/store";
import { useGetMentorProfileQuery } from "@/RTK/Apis/User";
import { useProfileDetailModal } from "@/hooks/Profile/Component";

export default function SocialLinkModal() {
  const dispatch = useDispatch();
  const reservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation
  );
  const getMentor = useGetMentorProfileQuery({
    id: reservation.mentorId,
  });
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const { UserData } = useProfileDetailModal(reservation.menteeId);
  const targetRole = userId === reservation.mentorId ? "멘티" : "멘토";
  const step = userId === reservation.mentorId ? "수락" : "진행";

  const handleOnClose = () => {
    dispatch(closeSocialLinkModal());
  };

  const handleOnAccept = () => {
    if (targetRole === "멘토") {
      if (getMentor.data?.socialLink !== "")
        window.open(getMentor.data?.socialLink);
      else
        window.open(
          `https://profile.intra.42.fr/users/${getMentor.data?.user.nickname}`
        );
    } else {
      window.open(
        `https://profile.intra.42.fr/users/${UserData?.user.nickname}`
      );
    }
    dispatch(closeSocialLinkModal());
  };

  return (
    <div
      className="connect-wrapper"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`connect-modal-section`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="connect-container md:w-full">
          <div className="w-full mt-5 self-center flex-col">
            <span className="connect-text text-lg font-bold pb-3 flex flex-col">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 flex justify-center mx-auto mb-2"
              >
                <path
                  d="M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10Z"
                  stroke="#94C942"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 10L9 13L14 8"
                  stroke="#94C942"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {step} 상태로 변경되었습니다.
            </span>
            {targetRole === "멘토" && (
              <span className="connect-text mt-2">
                아직 멘토와 연락이 닿지 않으셨나요?
              </span>
            )}
            <span className="connect-text">
              {targetRole}에게 슬랙메시지를 보내 일정을 잡아주세요.
            </span>
            <span className="connect-text mt-4 mb-2">
              {targetRole}의
              {getMentor.data?.socialLink !== "" && targetRole === "멘토"
                ? " 슬랙 프로필 "
                : " 인트라 프로필 "}
              페이지로 이동하시겠습니까?
            </span>
          </div>
          <div className="connect-btn-wrapper">
            <Button
              buttonType={ButtonType.CANCEL}
              onClick={() => handleOnClose()}
            >
              닫기
            </Button>
            <Button
              buttonType={ButtonType.ACCEPT}
              onClick={() => handleOnAccept()}
            >
              이동하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
