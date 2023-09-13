import React from "react";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetUserQuery } from "@/RTK/Apis/User";
import CardHashtag from "@/components/Global/CardHashtag";
import Image from "next/image";

interface props {
  reservation: ReservationDefaultDto;
}

const enum Role {
  Mentor = "mentor",
  Mentee = "mentee",
}

// ROLE: 카드 내 대상의 ROLE 을 뜻함.
function getStatus(role: Role, status: string) {
  if (role === Role.Mentee) {
    switch (status) {
      case "REQUEST":
        return "요청";
      case "ACCEPT":
        return "확인중";
      case "MENTEE_CHECKED":
        return "진행중";
      case "MENTEE_FEEDBACK":
        return "피드백";
      case "DONE":
        return "완료";
      case "CANCEL":
        return "취소";
    }
  } else {
    switch (status) {
      case "REQUEST":
        return "수락 대기";
      case "ACCEPT":
        return "수락";
      case "MENTEE_CHECKED":
        return "진행중";
      case "MENTEE_FEEDBACK":
        return "피드백";
      case "DONE":
        return "완료";
      case "CANCEL":
        return "취소";
    }
  }
  return `{role} ${status}`;
}

export default function ReservationCard({ reservation }: props) {
  const { status, mentorId, menteeId, category } = reservation;
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const targetUserId = userId === mentorId ? menteeId : mentorId;
  const role = userId === mentorId ? Role.Mentee : Role.Mentor;
  const { data: targetUser } = useGetUserQuery({ id: targetUserId });

  return (
    <>
      {targetUser && (
        <div className="reservation-card card">
          <div className={`reservation-card-status-container`}>
            <div className={`reservation-card-status ${status}`}>
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
              {role === Role.Mentor ? "멘토" : "멘티"}
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
