import { useDispatch, useSelector } from "react-redux";
import { closeSocialLinkModal } from "@/RTK/Slices/Reservation";
import { useState } from "react";
import { Button } from "@/common";
import { ButtonType } from "@/Types/General/ButtonType";
import { RootState } from "@/RTK/store";
import { useGetMentorProfileQuery } from "@/RTK/Apis/User";

export default function SocialLinkModal() {
  const dispatch = useDispatch();
  const reservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation
  );
  const getMentor = useGetMentorProfileQuery({
    id: reservation.mentorId,
  });

  const handleOnClose = () => {
    dispatch(closeSocialLinkModal());
  };

  const handleOnAccept = () => {
    getMentor.data?.socialLink !== ""
      ? window.open(getMentor.data?.socialLink)
      : window.open(
          `https://profile.intra.42.fr/users/${getMentor.data?.user.nickname}`
        );
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
        <div className="connect-container">
          <div className="connect-content-wrapper mt-5 self-center flex">
            <span className="break-keep text-center mx-auto">
              멘토의
              {getMentor.data?.socialLink !== ""
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
