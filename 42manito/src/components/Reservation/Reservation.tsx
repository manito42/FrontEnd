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
import { ReservationSlice } from "@/RTK/Slices/Reservation";
import { RootState } from "@/RTK/store";
import FeedbackCard from "@/components/Reservation/feedback/FeedbackCard";
import { ButtonType } from "@/Types/General/ButtonType";
import { useRouter } from "next/router";

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
  const { data: targetUser } = useGetUserQuery(
    {
      id: targetUserId,
    },
    { skip: targetUserId === 0 },
  );
  const status = reservation.status;
  const targetUserRole =
    targetUserId === reservation.mentorId
      ? ReservationUserRole.mentor
      : ReservationUserRole.mentee;
  const myRole =
    targetUserRole === ReservationUserRole.mentor
      ? ReservationUserRole.mentee
      : ReservationUserRole.mentor;
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = (name: string) => {
    router.push(`/Search/${name}`);
    dispatch(ReservationSlice.actions.closeReservationModal());
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
            <div className="reservation-title">멘토링 분야</div>
            <CardHashtag
              name={reservation.category.name}
              className={"text-sm bg-bg_color-50"}
              onClick={handleClick}
            />
            <div className="reservation-title">관심 분야</div>
            <div className="reservation-hashtags">
              {reservation.hashtags.map((hashtag, idx) => (
                <CardHashtag
                  name={hashtag.name}
                  key={idx}
                  className={"text-sm"}
                  sharp={true}
                  onClick={handleClick}
                />
              ))}
            </div>
            <div className="reservation-title">요청 메세지</div>
            <div className="reservation-message">
              <DescriptionComponent description={reservation.requestMessage} />
            </div>
          </div>
          <div className="reservation-title"> 멘토링 후기 </div>
          <div className="reservation-feedbacks mt-2">
            {!reservation.menteeFeedback && (
              <DescriptionComponent description={"후기가 아직 없습니다."} />
            )}
            {reservation.menteeFeedback &&
              (myRole === ReservationUserRole.mentee ||
                reservation.status === ReservationStatus.DONE) && (
                <FeedbackCard menteeFeedback={reservation.menteeFeedback} />
              )}
            {reservation.menteeFeedback &&
              myRole === ReservationUserRole.mentor &&
              reservation.status !== ReservationStatus.DONE && (
                <DescriptionComponent
                  description={"멘티에게 별점을 남긴 후 열람할 수 있습니다."}
                />
              )}
          </div>
          <div className="reservation-buttons">
            {/* 내가 멘티일 경우 수락 이후 취소 불가*/}
            {(status === ReservationStatus.REQUEST ||
              (myRole === ReservationUserRole.mentor &&
                status === ReservationStatus.ACCEPT)) && (
              <Button
                buttonType={ButtonType.CANCEL}
                onClick={() => {
                  dispatch(ReservationSlice.actions.openCancelModal());
                }}
              >
                {myRole === ReservationUserRole.mentor &&
                status === ReservationStatus.REQUEST
                  ? "거절하기"
                  : "취소하기"}
              </Button>
            )}
            {
              <NextProgressButton
                role={myRole}
                status={status}
                reservationId={reservation.id}
              />
            }
          </div>
          <div className="reservation-child-container">{children}</div>
        </div>
      )}
    </>
  );
}
