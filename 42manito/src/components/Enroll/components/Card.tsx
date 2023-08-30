/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AcceptButton from "./buttons/AcceptButton";
import CancelButton from "./buttons/CancelButton";
import DoneButton from "./buttons/doneButton";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { useGetUserQuery } from "@/RTK/Apis/User";
import MenteeFeedbackButton from "./buttons/menteeFeedbackButton";
import { RootState } from "@/RTK/store";
import { useSelector } from "react-redux";

interface EnrollCardProps {
  data: ReservationDefaultDto;
  isMentor: boolean;
}

const EnrollCard = ({ data, isMentor }: EnrollCardProps) => {
  const [msg, setMsg] = useState<string>("");

  const [acceptButton, setAcceptButton] = useState<boolean>(false);
  const [cancelButton, setCancelButton] = useState<boolean>(false);
  const [menteeFeedbackButton, setMenteeFeedbackButton] =
    useState<boolean>(false);
  const [doneButton, setDoneButton] = useState<boolean>(false);
  const owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const { data: targetUser, isLoading, error } = useGetUserQuery({ id: owner });

  const updateStatus = () => {
    if (isMentor) {
      if (data.status === "REQUEST" && !isLoading && targetUser) {
        setAcceptButton(true);
        setCancelButton(true);
        setDoneButton(false);
        setMenteeFeedbackButton(false);
        setMsg(`${targetUser.nickname} 님이 멘토링을 신청하셨습니다.`);
      } else if (data.status === "ACCEPT" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(true);
        setDoneButton(false);
        setMenteeFeedbackButton(false);
        setMsg(`${targetUser.nickname} 님과 멘토링이 진행중입니다.`);
      } else if (
        data.status === "MENTEE_FEEDBACK" &&
        !isLoading &&
        targetUser
      ) {
        setAcceptButton(false);
        setCancelButton(false);
        setDoneButton(true);
        setMenteeFeedbackButton(false);
        setMsg(`${targetUser.nickname} 님이 피드백을 작성하셨습니다.`);
      }
    } else {
      // 멘티
      if (data.status === "REQUEST" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(true);
        setDoneButton(false);
        setMsg(`${targetUser.nickname} 님에게 멘토링을 신청하셨습니다.`);
      } else if (data.status === "ACCEPT" && !isLoading && targetUser) {
        setAcceptButton(false);
        setCancelButton(false);
        setDoneButton(false);
        setMenteeFeedbackButton(true);
        setMsg(`${targetUser.nickname} 님과 멘토링이 진행중입니다.`);
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
      setDoneButton(false);
      setMenteeFeedbackButton(false);
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
            <CancelButton data={data.id} />
          </div>
        )}
        {doneButton && (
          <div className="mx-1">
            <DoneButton data={data.id} />
          </div>
        )}
        {menteeFeedbackButton && (
          <div className="mx-1">
            <MenteeFeedbackButton data={data.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollCard;
