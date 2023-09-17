import React from "react";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetUserQuery } from "@/RTK/Apis/User";
import CardHashtag from "@/components/Global/CardHashtag";
import Image from "next/image";
import { openReservationModal } from "@/RTK/Slices/Reservation";
import {
  getStatus,
  ReservationUserRole,
} from "@/components/Reservation/getReservationStatus";

interface props {
  reservation: ReservationDefaultDto;
}

export default function ReservationCard({ reservation }: props) {
  const { status, mentorId, menteeId, category } = reservation;
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const targetUserId = userId === mentorId ? menteeId : mentorId;
  const role =
    targetUserId === mentorId
      ? ReservationUserRole.mentor
      : ReservationUserRole.mentee;
  const { data: targetUser } = useGetUserQuery({ id: targetUserId });
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openReservationModal(reservation));
  };

  return (
    <>
      {targetUser && (
        <div className="reservation-card card" onClick={handleClick}>
          <div className={`reservation-status-container`}>
            <div className={`reservation-status ${status}`}>
              {getStatus(role, status)}
            </div>
          </div>
          <div className={"reservation-card-user-info"}>
            <div className="reservation-card-image-holder">
              <Image
                className="reservation-card-image"
                src={targetUser.profileImage}
                alt={targetUser.nickname}
                width={200}
                height={200}
              />
            </div>
            <div className="reservation-card-nickname">
              {targetUser.nickname}
            </div>
            <div className="reservation-card-role">
              {role === ReservationUserRole.mentor ? "멘토" : "멘티"}
            </div>
          </div>
          <div className="reservation-card-hashtags">
            {category && <CardHashtag name={category.name} />}
          </div>
        </div>
      )}
    </>
  );
}
