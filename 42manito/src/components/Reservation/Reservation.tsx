import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "@/RTK/Apis/User";
import ProfileImage from "@/components/Profile/Image";
import React from "react";
import CardHashtag from "@/components/Global/CardHashtag";
import DescriptionComponent from "@/components/Profile/Description";
import {
  getStatus,
  ReservationUserRole,
} from "@/components/Reservation/getReservationStatus";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { Button } from "@/common";
import NextProgressButton from "@/components/Reservation/NextProgressButton";
import { usePatchReservationCancelMutation } from "@/RTK/Apis/Reservation";
import { setSelectedReservation } from "@/RTK/Slices/Reservation";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { RootState } from "@/RTK/store";

interface props {
  children?: React.ReactNode;
}
export default function Reservation({ children }: props) {
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const reservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation,
  );
  const targetUserId =
    userId === reservation.mentorId
      ? reservation.menteeId
      : reservation.mentorId;
  const { data: targetUser } = useGetUserQuery({
    id: targetUserId,
  });
  const status = reservation.status;
  const targetUserRole =
    targetUserId === reservation.mentorId
      ? ReservationUserRole.mentor
      : ReservationUserRole.mentee;
  const myRole =
    targetUserRole === ReservationUserRole.mentor
      ? ReservationUserRole.mentee
      : ReservationUserRole.mentor;
  const [patchCancelReservation] = usePatchReservationCancelMutation();
  const dispatch = useDispatch();
  const handleCancelReservation = async (msg?: string, errorMsg?: string) => {
    try {
      const data = await patchCancelReservation({
        id: reservation.id,
      }).unwrap();
      dispatch(setSelectedReservation(data));
      alert(msg ? msg : "Success");
    } catch (e: BaseQueryError<any>) {
      alert(errorMsg ? errorMsg : "Error");
    }
  };

  return (
    <>
      {reservation && targetUser && (
        <div className="reservation-container">
          <div className="reservation-header">멘토링 정보</div>
          <div className="reservation-status-container mt-5">
            <div className={`reservation-status ${status}`}>
              {getStatus(targetUserRole, status)}
            </div>
          </div>
          <div className="reservation-user-info">
            <div className="reservation-image-holder">
              <ProfileImage src={targetUser.profileImage} />
            </div>
            <div className="reservation-user-info-name">
              {targetUser.nickname}
            </div>
            <div className="reservation-user-role">
              {targetUserRole === ReservationUserRole.mentor ? "멘토" : "멘티"}
            </div>
          </div>
          <div className="reservation-info">
            <div className="reservation-category my-1">
              <div className="reservation-title -mb-1">신청 분야</div>
              <CardHashtag name={reservation.category.name} />
            </div>
            <div className="reservation-title -mb-1">해시태그</div>
            <div className="reservation-hashtags my-1">
              {reservation.hashtags.map((hashtag, idx) => (
                <CardHashtag name={`#${hashtag.name}`} key={idx} />
              ))}
            </div>
            <div className="reservation-title">요청 메세지</div>
            <div className="reservation-message">
              <DescriptionComponent description={reservation.requestMessage} />
            </div>
          </div>
          <div className="reservation-title mb-2"> 멘토링 후기 </div>
          <div className="reservation-feedbacks">
            {!reservation.menteeFeedback && (
              <DescriptionComponent description={"후기가 아직 없습니다."} />
            )}
            {reservation.menteeFeedback &&
              reservation.status !== ReservationStatus.DONE && (
                <DescriptionComponent
                  description={"멘티애개 별점을 남긴 후 열람할 수 있습니다."}
                />
              )}
            {reservation.menteeFeedback && (
              <DescriptionComponent
                description={reservation.menteeFeedback.content}
              />
            )}
          </div>
          <div className="reservation-buttons">
            {
              <NextProgressButton
                role={myRole}
                status={status}
                reservationId={reservation.id}
              />
            }
            {/* 내가 멘티일 경우 수락 이후 취소 불가*/}
            {(status === ReservationStatus.REQUEST ||
              (myRole === ReservationUserRole.mentor &&
                status === ReservationStatus.ACCEPT)) && (
              <Button
                className="reservation-cancel-button"
                onClick={() => {
                  handleCancelReservation(
                    "취소 완료되었습니다.",
                    "취소에 실패하였습니다.",
                  );
                }}
              >
                {myRole === ReservationUserRole.mentor &&
                status === ReservationStatus.REQUEST
                  ? "거절하기"
                  : "취소하기"}
              </Button>
            )}
          </div>
          <div className="reservation-child-container">{children}</div>
        </div>
      )}
    </>
  );
}
