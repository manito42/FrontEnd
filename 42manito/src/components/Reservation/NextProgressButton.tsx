import {
  usePatchReservationAcceptMutation,
  usePatchReservationMenteeCheckMutation,
} from "@/RTK/Apis/Reservation";
import { ReservationUserRole } from "@/components/Reservation/getReservationStatus";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { Button } from "@/common";
import { ButtonType } from "@/Types/General/ButtonType";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { useDispatch } from "react-redux";
import {
  openFeedbackModal,
  setSelectedReservation,
} from "@/RTK/Slices/Reservation";

interface props {
  role: ReservationUserRole;
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
  const [patchMenteeCheckedReservation] =
    usePatchReservationMenteeCheckMutation();

  const dispatch = useDispatch();
  const handlePatchReservation = async (
    data: any,
    patchFunc: any,
    msg?: string,
    errorMsg?: string
  ) => {
    try {
      const res = await patchFunc(data).unwrap();
      dispatch(setSelectedReservation(res));
      alert(msg ? msg : "Success");
    } catch (e: BaseQueryError<any>) {
      alert(errorMsg ? errorMsg : "Error");
    }
  };

  if (role === ReservationUserRole.mentor) {
    switch (status) {
      case ReservationStatus.REQUEST:
        return (
          <Button
            buttonType={ButtonType.ACCEPT}
            onClick={() => {
              handlePatchReservation(
                req,
                patchAcceptReservation,
                "수락되었습니다.",
                "수락에 실패하였습니다."
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
      /* 리뷰 등록에 대해서 별도의 모달이 필요함*/
      case ReservationStatus.MENTEE_FEEDBACK:
        return (
          <Button
            buttonType={ButtonType.ACCEPT}
            onClick={() => {
              dispatch(openFeedbackModal());
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
            buttonType={ButtonType.ACCEPT}
            onClick={() => {
              handlePatchReservation(
                req,
                patchMenteeCheckedReservation,
                "확인되었습니다.",
                "요청에 실패했습니다."
              );
              // window.open("멘토 슬랙 링크"");
            }}
          >
            진행하기
          </Button>
        );
      /* 리뷰 등록에 대해서 별도의 모달이 필요함*/
      case ReservationStatus.MENTEE_CHECKED:
        return (
          <Button
            buttonType={ButtonType.ACCEPT}
            onClick={() => {
              dispatch(openFeedbackModal());
            }}
          >
            리뷰 등록
          </Button>
        );
      case ReservationStatus.MENTEE_FEEDBACK:
        return;
      case ReservationStatus.DONE:
        return;
    }
  }
}
