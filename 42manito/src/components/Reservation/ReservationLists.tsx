import React, { useEffect, useState } from "react";
import ReservationCard from "@/components/Reservation/card/ReservationCard";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { useGetReservationsQuery } from "@/RTK/Apis/Reservation";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { IReservationGetReqQuery } from "@/Types/Reservations/ReservationGetReq.dto";

interface props {
  query: IReservationGetReqQuery;
  name: string;
  emptyMsg?: string;
}

export default function ReservationLists({ query, name, emptyMsg }: props) {
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  // uid must be set
  const { data: response } = useGetReservationsQuery({
    id: userId as number,
    query: query,
  });
  const [reservations, setReservationRequests] = useState<
    ReservationDefaultDto[]
  >([]);

  useEffect(() => {
    if (response) {
      setReservationRequests(response.content);
    }
  }, [response]);

  const onLeftClick = () => {
    if (!reservations) return;
    const elem = document.getElementsByClassName(
      `reservation-requests-container ${name}`,
    )[0];
    elem.scrollLeft -= elem.clientWidth;
  };
  const onRightClick = () => {
    if (!reservations) return;
    const elem = document.getElementsByClassName(
      `reservation-requests-container ${name}`,
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
        <div className={`reservation-requests-container ${name}`}>
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
