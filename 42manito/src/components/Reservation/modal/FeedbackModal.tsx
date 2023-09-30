import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeFeedbackModal,
  setSelectedReservation,
} from "@/RTK/Slices/Reservation";
import Rating from "@mui/material/Rating";

import { RootState } from "@/RTK/store";
import {
  useGetReservationQuery,
  usePatchReservationMenteeFeedbackMutation,
  usePatchReservationMentorFeedbackMutation,
} from "@/RTK/Apis/Reservation";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { Input } from "antd";
import { Button } from "@/common";

const { TextArea } = Input;
const FeedbackModal = () => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const reservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation
  );
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const [patchMenteeFeedbackReservation] =
    usePatchReservationMenteeFeedbackMutation();
  const [patchMentorFeedbackReservation] =
    usePatchReservationMentorFeedbackMutation();
  const { data: updatedReservation } = useGetReservationQuery(reservation.id);
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
  const handleYes = async () => {
    // mentor case
    if (userId === reservation.mentorId) {
      await handlePatchReservation(
        { id: reservation.id, rating: Number(rating) },
        patchMentorFeedbackReservation,
        "멘토링이 성공적으로 종료되었습니다.",
        "후기 등록 실패"
      );
    }
    // mentee case
    else {
      await handlePatchReservation(
        { id: reservation.id, rating: Number(rating), content: review },
        patchMenteeFeedbackReservation,
        "후기 등록 완료",
        "후기 등록 실패"
      );
    }
    dispatch(closeFeedbackModal());
  };
  useEffect(() => {
    if (updatedReservation) {
      dispatch(setSelectedReservation(updatedReservation));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedReservation]);
  const handleClose = () => {
    dispatch(closeFeedbackModal());
  };
  return (
    <div
      className="connect-wrapper"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`connect-modal-section`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="connect-container">
          <div className="connect-content-wrapper">
            <div className="connect-header"> 멘토링 만족도</div>
            <div className={"feedback-rating"}>
              <Rating
                name={"rating"}
                value={rating}
                precision={0.5}
                onChange={(e, newValue) => setRating(Number(newValue))}
              />
            </div>
            {reservation.menteeId === userId && (
              <>
                <div className="connect-header">멘토링 후기</div>
                <TextArea
                  className="connect-message"
                  placeholder="멘토링 후기를 남겨주세요."
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                />
              </>
            )}
          </div>
          <div className="connect-btn-wrapper">
            <Button accept={false} onClick={() => handleClose()}>
              취소하기
            </Button>
            <Button accept={true} onClick={() => handleYes()}>
              확인하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackModal;
