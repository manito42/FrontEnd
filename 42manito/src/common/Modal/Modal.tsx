import React, { ComponentProps, useState } from "react";
import styles from "./Modal.module.css";
import { twMerge } from "tailwind-merge";

export interface Props extends ComponentProps<"div"> {
  close: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 *
 * @param close: 애니메이션을 제외한 모달을 닫을때 데이터핸들링관련 함수를 작성해서 주세요.
 * @param children: 모달 안에 들어갈 컴포넌트를 넘겨주세요.
 * @param className: 모달내 컨텐츠에 적용할 클래스를 넘겨주세요.
 *
 */

export default function ManitoModal({ close, children, className }: Props) {
  const [closeAnimation, setCloseAnimation] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "wrapper") {
      zoomOut();
    }
  };

  const zoomOut = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      setCloseAnimation(false);
      close();
    }, 300);
  };

  const classNameValue = twMerge(
    styles["modal-content"],
    className === undefined ? "" : className
  );
  return (
    <div
      className={styles["modal-container"]}
      id="wrapper"
      onClick={handleClose}
    >
      <section
        className={`${styles["modal-section"]} ${
          closeAnimation ? styles["close-modal"] : styles["mentor-modal"]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["close-btn"]} onClick={zoomOut}>
          X
        </button>
        <div className="px-4">
          <div className={classNameValue}>{children}</div>
        </div>
      </section>
    </div>
  );
}
