import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import ConnectHashtagSelect from "@/components/Mentor/HashtagSelect";
import { Input } from "antd";
import { setMessage } from "@/RTK/Slices/MentorConnect";
import ConnectCategorySelect from "@/components/Mentor/CategorySelect";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { Button } from "@/common";
import { ButtonType } from "@/Types/General/ButtonType";

interface Props {
  handleYes: () => void;
  children?: React.ReactNode;
}

const ConnectModal = ({ handleYes, children }: Props) => {
  const [focus, setFocus] = useState(false);
  const currentMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useAppDispatch();

  const handleFocusOut = () => {
    setFocus(true);
    setTimeout(() => {
      setFocus(false);
      dispatch(CurrMentorSlice.actions.closeConnectModal());
    }, 200);
  };

  const handleConnect = () => {
    handleYes();
  };
  return (
    <div
      className="connect-wrapper"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`connect-modal-section ${focus && "close-connect-modal"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="connect-container">
          <div className="connect-title mt-5"> 멘토링 요청</div>
          <div className="connect-content-wrapper">
            <div className="connect-header"> 멘토링 분야 </div>
            <ConnectCategorySelect
              categories={currentMentorState.currMentor.categories}
            />
            <div className="connect-header"> 세부 분야 </div>
            <ConnectHashtagSelect
              hashtag={currentMentorState.currMentor.hashtags}
            />
            <div className="connect-header"> 요청 메시지 </div>
            <Input.TextArea
              showCount
              maxLength={1000}
              style={{ height: 80, marginBottom: 24 }}
              onChange={(e) => dispatch(setMessage(e.target.value))}
              placeholder="최대 1000글자"
              className="w-full max-w-[500px]"
            />
          </div>
          <div className="connect-btn-wrapper">
            <Button
              buttonType={ButtonType.CANCEL}
              onClick={() => handleFocusOut()}
            >
              취소하기
            </Button>
            <Button
              buttonType={ButtonType.ACCEPT}
              onClick={() => handleConnect()}
            >
              요청하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectModal;
