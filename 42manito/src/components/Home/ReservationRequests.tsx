import React, {useEffect, useState} from "react";
import RequestsWrapper from "@/components/Reservation/RequestsWrapper";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/RTK/store";
import {useGetActiveMenteeEnrollmentMutation, useGetActiveMentorEnrollmentMutation} from "@/RTK/Apis/Enroll";
import {initReservations, setMenteeReservations, setMentorReservations} from "@/RTK/Slices/Enroll";

interface props {}

export default function ReservationRequests({}: props) {
  const [menteePage, setMenteePage] = useState(0);
  const [mentorPage, setMentorPage] = useState(0);
  const [getActiveMentorEnrollment,
    { data: mentorData, isLoading: getMentorLoading },
  ] = useGetActiveMentorEnrollmentMutation();
  const [
    getActiveMenteeEnrollment,
    { data: menteeData, isLoading: getMenteeLoading },
  ] = useGetActiveMenteeEnrollmentMutation();
  const Owner = useSelector(
      (state: RootState) => state.rootReducers.global.uId
  );
  const fetchMoreMentorData = () => {
    getActiveMentorEnrollment({ take: 12, page: mentorPage, id: Owner });
  };

  const fetchMoreMenteeData = () => {
    getActiveMenteeEnrollment({ take: 12, page: menteePage, id: Owner });
  };

  const mentorList = useSelector(
      (state: RootState) => state.rootReducers.enroll.mentorReservation
  );
  const menteeList = useSelector(
      (state: RootState) => state.rootReducers.enroll.menteeReservation
  );
  return (
    <>
      <div className="reservation-requests-wrapper">
        <div className="reservation-requests-container">
          <RequestsWrapper/>
        </div>
      </div>
      {/*<div className="bg-green-600 w-[200px] h-[200px]" onClick={fetchMoreMenteeData}>*/}
      {/*  Menteebutton {Owner} {mentorList.length} {menteeList.length}*/}
      {/*</div>*/}
      {/*<div className="bg-red-500 w-[200px] h-[200px]" onClick={fetchMoreMentorData}>*/}
      {/*  Mentorbutton*/}
      {/*</div>*/}
    </>
  );
}
