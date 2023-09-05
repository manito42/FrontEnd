import React from "react";
import RequestsWrapper from "@/components/Reservation/RequestsWrapper";

interface props {}

export default function ReservationRequests({}: props) {
  return (
    <>
      <div className="reservation-requests-wrapper">
        <div className="reservation-requests-container">
          <RequestsWrapper />
        </div>
      </div>
    </>
  );
}
