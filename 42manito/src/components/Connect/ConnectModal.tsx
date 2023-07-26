import React, { useState } from "react";

interface Props {
  message: string;
  onClose: () => void;
  handleYes: () => void;
  children?: React.ReactNode;
}

const ConnectModal = ({ message, onClose, handleYes, children }: Props) => {
  const [focus, setFocus] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleFocusOut = () => {
    setFocus(true);
    setTimeout(() => {
      onClose();
      setFocus(false);
    }, 200);
  };

  const handleConnect = () => {
    setDisabled(true);
    handleYes();
    setDisabled(false);
  };

  return (
    <div
      className="connect-container"
      id="wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <section
        className={`connect-section ${focus && "close-connect-modal"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="connect-container">
          <div className="connect-content">
            <button className="close-btn" onClick={onClose}>
              X
            </button>
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="text-center mt-5">
                {children}
                <h3 className="message">{message}</h3>
              </div>
              <div className="connect-btn-container">
                <button
                  className="connect-btn"
                  type="button"
                  onClick={handleConnect}
                  disabled={disabled}
                >
                  Yes
                </button>
                <button
                  className="connect-btn"
                  type="button"
                  onClick={handleFocusOut}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectModal;
