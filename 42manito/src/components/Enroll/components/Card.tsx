/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AcceptButton from "./buttons/AcceptButton";
import CancelButton from "./buttons/CancelButton";
import FinishButton from "./buttons/FinishButton";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { useGetUserQuery } from "@/RTK/Apis/User";
import PendingButton from "./buttons/PendingButton";

interface EnrollCardProps {
  data: ReservationDefaultDto;
  isMentor: boolean;
}

const EnrollCard = ({ data, isMentor }: EnrollCardProps) => {
  const [msg, setMsg] = useState<string>("");

  const [acceptButton, setAcceptButton] = useState<boolean>(false);
  const [cancelButton, setCancelButton] = useState<boolean>(false);
  const [pendingButton, setPendingButton] = useState<boolean>(false);
  const [finishButton, setFinishButton] = useState<boolean>(false);

  const {
    data: targetUser,
    isLoading,
    error,
  } = useGetUserQuery({ id: isMentor ? data.menteeId : data.mentorId });

  const updateStatus = () => {
    if (isMentor) {
      if (data.status === "REQUEST" && !isLoading && targetUser) {
        setAcceptButton(true);
        setCancelButton(true);
        setFinishButton(false);
        setPendingButton(false);
        setMsg(`${targetUser.nickname} 님이 멘토링을 신청하셨습니다.`);
      } else if (data.status === "ACCEPT" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(false);
        setFinishButton(true);
        setPendingButton(false);
        setMsg(`${targetUser.nickname} 님과 멘토링이 진행중입니다.`);
      } else if (data.status === "PENDING" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(false);
        setFinishButton(false);
        setPendingButton(false);
        setMsg(`${targetUser.nickname} 님이 피드백을 작성중입니다.`);
      }
    } else {
      if (data.status === "REQUEST" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(true);
        setFinishButton(false);
        setPendingButton(false);
        setMsg(`${targetUser.nickname} 님에게 멘토링을 신청하셨습니다.`);
      } else if (data.status === "ACCEPT" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(false);
        setFinishButton(true);
        setMsg(`${targetUser.nickname} 님과 멘토링이 진행중입니다.`);
      } else if (data.status === "PENDING" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(false);
        setFinishButton(false);
        setPendingButton(true);
        setMsg(
          `${targetUser.nickname} 님과의 멘토링에 대한 피드백을 작성해주세요.`
        );
      }
    }
  };

  useEffect(() => {
    updateStatus();
  }, [data.status]);

  useEffect(() => {
    return () => {
      setAcceptButton(false);
      setCancelButton(false);
      setFinishButton(false);
      setPendingButton(false);
    };
  });

  if (data === undefined) return null;

  return (
    <div className="enroll-card">
      <h1 className="mt-7">{msg}</h1>
      <div className="flex items-center">
        {acceptButton && (
          <div className="mx-1">
            <AcceptButton
              data={{ id: data.id }}
              message={data.requestMessage}
            />
          </div>
        )}
        {cancelButton && (
          <div className="mx-1">
            <CancelButton data={data} />
          </div>
        )}
        {finishButton && (
          <div className="mx-1">
            <FinishButton data={data.id} />
          </div>
        )}
        {pendingButton && (
          <div className="mx-1">
            <PendingButton data={data.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollCard;
