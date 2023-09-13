import React, { useEffect, useState } from "react";
import { useGetRequestReservationsQuery } from "@/RTK/Apis/Reservation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import ReservationCard from "@/components/Reservation/card/ReservationCard";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { setReservationRequests } from "@/RTK/Slices/Reservation";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";

interface props {}

export default function ReservationRequests({}: props) {
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const { data: response } = useGetRequestReservationsQuery({ id: userId });
  const [reservations, setReservationRequests] = useState<
    ReservationDefaultDto[] | null
  >(null);

  useEffect(() => {
    if (response) {
      setReservationRequests([
        ...response.menteeReservations,
        ...response.mentorReservations,
      ]);
    }
  }, [response]);
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
          {reservations &&
            reservations.map((reservation, idx) => (
              <ReservationCard key={idx} reservation={reservation} />
            ))}
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