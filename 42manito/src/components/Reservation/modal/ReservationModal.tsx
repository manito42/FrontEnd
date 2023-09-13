import { useDispatch } from "react-redux";
import { closeReservationModal } from "@/RTK/Slices/Reservation";
import Reservation from "@/components/Reservation/Reservation";
import React, { useState } from "react";

export default function ReservationModal() {
  const dispatch = useDispatch();
  const [closeAnimation, setCloseAnimation] = useState(false);

  const handleOnClose = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      dispatch(closeReservationModal());
      setCloseAnimation(false);
    }, 300);
  };

  return (
    <>
      <div className="reservation-modal-wrapper" onClick={handleOnClose}>
        <section
          className={`reservation-modal-section ${
            closeAnimation ? "close-modal" : "open-modal"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Reservation>
            <button className="close-btn" onClick={handleOnClose}>
              닫기
            </button>
          </Reservation>
        </section>
      </div>
    </>
  );
}
