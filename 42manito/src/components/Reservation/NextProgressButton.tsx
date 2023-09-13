import {
  usePatchReservationAcceptMutation,
  usePatchReservationDoneMutation,
  usePatchReservationMenteeCheckMutation,
  usePatchReservationMenteeFeedbackMutation,
} from "@/RTK/Apis/Reservation";
import { ReservationRole } from "@/components/Reservation/getReservationStatus";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { Button } from "@/common";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { useDispatch } from "react-redux";
import { setSelectedReservation } from "@/RTK/Slices/Reservation";

interface props {
  role: ReservationRole;
  status: ReservationStatus;
  reservationId: number;
}
/* role => 사용자의 role 을 의미함*/
export default function NextProgressButton({
  role,
  status,
  reservationId,
}: props) {
  const req = { id: reservationId };
  const [patchAcceptReservation] = usePatchReservationAcceptMutation();
  const [patchDoneReservation] = usePatchReservationDoneMutation();
  const [patchMenteeCheckedReservation] =
    usePatchReservationMenteeCheckMutation();
  const [patchMenteeFeedbackReservation] =
    usePatchReservationMenteeFeedbackMutation();
  const dispatch = useDispatch();
  const handlePatchReservation = async (patchFunc, msg?, errorMsg?) => {
    try {
      const data = await patchFunc(req).unwrap();
      dispatch(setSelectedReservation(data));
      alert(msg ? msg : "Success");
    } catch (e: BaseQueryError<any>) {
      alert(errorMsg ? errorMsg : "Error");
    }
  };

  if (role === ReservationRole.Mentor) {
    switch (status) {
      case ReservationStatus.REQUEST:
        return (
          <Button
            className={`reservation-next-button`}
            onClick={() => {
              handlePatchReservation(
                patchAcceptReservation,
                "수락되었습니다.",
                "수락에 실패하였습니다.",
              );
            }}
          >
            수락하기
          </Button>
        );
      case ReservationStatus.ACCEPT:
        return;
      case ReservationStatus.MENTEE_CHECKED:
        return;
      case ReservationStatus.MENTEE_FEEDBACK:
        return (
          <Button
            className={`reservation-next-button`}
            onClick={() => {
              handlePatchReservation(
                patchDoneReservation,
                "등록되었습니다.",
                "등록에 실패하였습니다.",
              );
            }}
          >
            리뷰 등록
          </Button>
        );
      case ReservationStatus.DONE:
        return;
    }
  } else {
    switch (status) {
      case ReservationStatus.REQUEST:
        return;
      case ReservationStatus.ACCEPT:
        return (
          <Button
            className={`reservation-next-button`}
            onClick={() => {
              handlePatchReservation(
                patchMenteeCheckedReservation,
                "확인되었습니다.",
                "요청에 실패했습니다.",
              );
            }}
          >
            확인
          </Button>
        );
      case ReservationStatus.MENTEE_CHECKED:
        return (
          <Button
            className={`reservation-next-button`}
            onClick={() => {
              handlePatchReservation(
                patchMenteeFeedbackReservation,
                "등록되었습니다.",
                "등록에 실패했습니다.",
              );
            }}
          >
            리뷰 등록
          </Button>
        );
      case ReservationStatus.MENTEE_FEEDBACK:
        return;
      case ReservationStatus.DONE:
        return <> </>;
    }
  }
}
