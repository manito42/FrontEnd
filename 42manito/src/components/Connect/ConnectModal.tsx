import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import ConnectHashtagSelect from "@/components/Mentor/HashtagSelect";
import { Input } from "antd";
import { setMessage } from "@/RTK/Slices/MentorConnect";
import ConnectCategorySelect from "@/components/Mentor/CategorySelect";
import { useModalOpenClose } from "@/hooks/Mentor/modalOpenClose";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";

interface Props {
  message: string;
  onClose: () => void;
  handleYes: () => void;
  children?: React.ReactNode;
}

const ConnectModal = ({ message, onClose, handleYes, children }: Props) => {
  const [focus, setFocus] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const currentMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const dispatch = useAppDispatch();
  const { handleConnectModalClose } = useModalOpenClose();

  const handleFocusOut = () => {
    setFocus(true);
    window.history.back();
    setTimeout(() => {
      setFocus(false);
      handleConnectModalClose();
    }, 200);
  };

  const handleConnect = () => {
    setDisabled(true);
    handleYes();
    setDisabled(false);
  };

  return (
    <div
      className="ConnectWrapper"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`connect-modal-section ${
          (focus || currentMentorState.focus) && "close-connect-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="connect-container">
          <div className="connect-title mt-5">멘토링 요청</div>
          <div className="connect-content-wrapper">
            <div className="connect-header"> 카테고리</div>
            <ConnectCategorySelect
              categories={currentMentorState.currMentor.categories}
            />
            <div className="connect-header"> 해시태그</div>
            <ConnectHashtagSelect
              hashtag={currentMentorState.currMentor.hashtags}
            />
            <div className="connect-header">요청 메시지</div>
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
            <button
              className="connect-approve-btn connect-btn"
              type="button"
              onClick={handleConnect}
            >
              Connect
            </button>
            <button
              className="connect-cancel-btn connect-btn"
              type="button"
              onClick={handleFocusOut}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectModal;
