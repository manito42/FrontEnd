import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import { ReservationGetDto } from "@/Types/Reservation/Reservations";
import React, { useEffect, useState } from "react";
import { mockMentorProfiles } from "../../../../mocData/mentorData";
import AcceptButton from "./buttons/AcceptButton";
import CancelButton from "./buttons/CancelButoon";
import FinishButton from "./buttons/FinishButton";

interface EnrollCardProps {
  data: ReservationGetDto;
  isMentor: boolean;
}

const EnrollCard = ({ data, isMentor }: EnrollCardProps) => {
  const user: mentorResDto[] = mockMentorProfiles; // TODO: User 개체여야함
  const [msg, setMsg] = useState<string>("");

  const targetUser: mentorResDto | undefined = user.find((mentor) =>
    isMentor
      ? mentor.user.id === data.menteeId
      : mentor.user.id === data.mentorId
  ); // TODO: 추후에 삭제예정

  const [acceptButton, setAcceptButton] = useState<boolean>(false);
  const [cancelButton, setCancelButton] = useState<boolean>(false);
  const [finishButton, setFinishButton] = useState<boolean>(false);

  const updateStatus = () => {
    if (isMentor) {
      if (data.status === "REQUEST") {
        setAcceptButton(true);
        setCancelButton(true);
        setFinishButton(false);
        setMsg(`${targetUser?.user.nickname} 님이 멘토링을 신청하셨습니다.`);
      } else if (data.status === "ACCEPT") {
        setAcceptButton(false);
        setCancelButton(false);
        setFinishButton(true);
        setMsg(`${targetUser?.user.nickname} 님과 멘토링이 진행중입니다.`);
      }
    } else {
      if (data.status === "REQUEST") {
        setAcceptButton(false);
        setCancelButton(true);
        setFinishButton(false);
        setMsg(`${targetUser?.user.nickname} 님에게 멘토링을 신청하셨습니다.`);
      } else if (data.status === "ACCEPT") {
        setAcceptButton(false);
        setCancelButton(false);
        setFinishButton(true);
        setMsg(`${targetUser?.user.nickname} 님과 멘토링이 진행중입니다.`);
      }
    }
  };

  useEffect(() => {
    updateStatus();
  }, [data.status]);

  if (targetUser === undefined) return null; // TODO: 추후에 삭제예정
  if (data.status === "COMPLETED") return null; // TODO: 추후에 삭제예정
  if (data.status === "REJECT") return null; // TODO: 추후에 삭제예정
  if (data.status === "CANCEL") return null; // TODO: 추후에 삭제예정

  return (
    <div className="enroll-card">
      <h1 className="mt-7">{msg}</h1>
      <div className="flex items-center">
        <div className="mx-1">
          <AcceptButton data={data} isVisible={acceptButton} />
        </div>
        <div className="mx-1">
          <CancelButton data={data} isVisible={cancelButton} />
        </div>
        <div className="mx-1">
          <FinishButton data={data} isVisible={finishButton} />
        </div>
      </div>
    </div>
  );
};

export default EnrollCard;
