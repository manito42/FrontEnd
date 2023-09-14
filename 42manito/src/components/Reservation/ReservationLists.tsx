import React from "react";
import ReservationCard from "@/components/Reservation/card/ReservationCard";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";

interface props {
  reservations: ReservationDefaultDto[];
  emptyMsg?: string;
}

export default function ReservationLists({ reservations, emptyMsg }: props) {
  const onLeftClick = () => {
    if (!reservations) return;
    const elem = document.getElementsByClassName(
      "reservation-requests-container",
    )[0];
    elem.scrollLeft -= elem.clientWidth;
  };
  const onRightClick = () => {
    if (!reservations) return;
    const elem = document.getElementsByClassName(
      "reservation-requests-container",
    )[0];
    elem.scrollLeft += elem.clientWidth;
  };
  return (
    <>
      <div className="reservation-requests-wrapper">
        <CaretLeftOutlined
          className="reservation-requests-scroll"
          style={{ fontSize: "20px" }}
          onClick={onLeftClick}
        />
        <div className="reservation-requests-container">
          {reservations.length > 0 &&
            reservations.map((reservation, idx) => (
              <ReservationCard key={idx} reservation={reservation} />
            ))}
          {reservations.length == 0 && (
            <div className="reservation-requests-empty">{emptyMsg}</div>
          )}
        </div>
        <CaretRightOutlined
          className="reservation-requests-scroll"
          style={{ fontSize: "20px" }}
          onClick={onRightClick}
        />
      </div>
    </>
  );
}
