import React, { useState } from "react";
import {RootState, useAppDispatch} from "@/RTK/store";
import { Input } from "antd";
import { Button } from "@/common";
import { ButtonType } from "@/Types/General/ButtonType";
import {closeCancelModal, setSelectedReservation} from "@/RTK/Slices/Reservation";
import CancelMessageSelect from "@/components/Cancel/CancelMessageSelect";
import { BaseQueryError } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import {usePatchReservationCancelMutation} from "@/RTK/Apis/Reservation";
import {useSelector} from "react-redux";


const CancelModal = () => {
  const [openTextArea, setOpenTextArea] = useState(false);
  const [cancelMsg, setCancelMsg] = useState("");
  const dispatch = useAppDispatch();
  const [patchCancelReservation] = usePatchReservationCancelMutation();
  const reservation = useSelector(
      (state: RootState) => state.rootReducers.reservation.selectedReservation,
  );
  const handleCancel = async (msg?: string, errorMsg?: string) => {
    try {
      const data = await patchCancelReservation({
        id: reservation.id,
        content: cancelMsg,
      }).unwrap();
      dispatch(setSelectedReservation(data));
      alert(msg ? msg : "Success");
      dispatch(closeCancelModal());
    } catch (e: BaseQueryError<any>) {
      alert(errorMsg ? errorMsg : "Error");
    }
  };

  const handleClose = () => {
    dispatch(closeCancelModal());
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
          <div className="connect-title mt-5"> 멘토링 취소</div>
          <div className="connect-content-wrapper">
            <div className="connect-header"> 취소하려는 이유를 선택해주세요 </div>
            <CancelMessageSelect setOpenTextArea={setOpenTextArea} setCancelMsg={setCancelMsg}/>
            {openTextArea && <Input.TextArea
              showCount
              maxLength={1000}
              style={{ height: 80, marginBottom: 24 }}
              onChange={(e) => setCancelMsg(e.target.value)}
              placeholder="최대 1000글자"
              className="w-full max-w-[500px] mt-3"
            />}
          </div>
          <div className="connect-btn-wrapper">
            <Button
              buttonType={ButtonType.CANCLE}
              onClick={() => handleClose()}
            >
              닫기
            </Button>
            <Button
              buttonType={ButtonType.ACCEPT}
              onClick={() => handleCancel()}
            >
              취소하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CancelModal;
