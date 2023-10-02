import Reservation from "@/components/Reservation/Reservation";
import { useRouter } from "next/router";
import { useGetReservationQuery } from "@/RTK/Apis/Reservation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedReservation } from "@/RTK/Slices/Reservation";
import React, { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import FeedbackModal from "@/components/Reservation/modal/FeedbackModal";
import { RootState } from "@/RTK/store";

export default function ReservationPage() {
  const route = useRouter();
  const reservationId = route.query.reservationId;
  const {
    data: reservation,
    error,
    isLoading,
  } = useGetReservationQuery(Number(reservationId), {
    skip: reservationId === undefined,
  });
  const isFeedbackModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isFeedbackModalOpen,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !error && reservation) {
      dispatch(setSelectedReservation(reservation));
    }
  }, [error, reservation, dispatch, isLoading]);
  return (
    <>
      <Layout>
        <div className="app-container">
          <div className="py-10">{!isLoading && !error && <Reservation />}</div>
        </div>
        {isFeedbackModalOpen && <FeedbackModal />}
      </Layout>
    </>
  );
}
