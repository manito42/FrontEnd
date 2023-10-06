import React, { useEffect, useState } from "react";
import ReservationCard from "@/components/Reservation/card/ReservationCard";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { useGetReservationsQuery } from "@/RTK/Apis/Reservation";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { ReservationRole } from "@/Types/Reservations/ReservationRole";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { Pagination } from "@mui/material";

interface props {
  take?: number;
  role?: ReservationRole;
  status?: ReservationStatus[];
  name: string;
  emptyMsg?: string;
  pagination?: boolean;
}

export default function ReservationLists({
  take = 10,
  role = ReservationRole.ALL,
  status = [
    ReservationStatus.REQUEST,
    ReservationStatus.ACCEPT,
    ReservationStatus.MENTEE_CHECKED,
    ReservationStatus.MENTEE_FEEDBACK,
    ReservationStatus.DONE,
    ReservationStatus.CANCEL,
  ],
  name,
  emptyMsg,
  pagination,
}: props) {
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const [reservations, setReservationRequests] = useState<
    ReservationDefaultDto[]
  >([]);
  const [page, setPage] = useState<number>(0);
  const { data: response } = useGetReservationsQuery({
    id: userId as number,
    query: {
      take: take,
      role: role,
      status: status,
      page: page,
    },
  });

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
      {pagination && response !== undefined && (
        <div className="reservation-requests-pagination">
          <Pagination
            defaultPage={1}
            page={page + 1}
            showFirstButton={true}
            showLastButton={true}
            count={response.page.totalPage + 1}
            onChange={(e, page) => {
              setPage(page - 1);
            }}
          />
        </div>
      )}
    </>
  );
}
