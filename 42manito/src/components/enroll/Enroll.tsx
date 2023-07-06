import React from "react";
import { mocReservation } from "../../../mocData/mocReservation";
import { ReservationGetDto } from "@/Types/Reservations";
import EnrollCard from "./components/ErollCard";
import InfiniteScroll from "react-infinite-scroll-component";
import TypeIt from "typeit-react";

const Enroll = () => {
  const reservation: ReservationGetDto[] = mocReservation;

  const mentor: ReservationGetDto[] = reservation.filter(
    (value) =>
      value.mentorId === 1 &&
      (value.status === "ACCEPT" || value.status === "REQUEST")
  );

  const mentee: ReservationGetDto[] = reservation.filter(
    (value) =>
      value.menteeId === 1 &&
      (value.status === "ACCEPT" || value.status === "REQUEST")
  );

  console.log(`mentor: ${mentor.length} mentee: ${mentee.length}`);

  return (
    <div className="my-16 w-full">
      <div className="w-[100%] dark:bg-white/40 bg-black/40 h-[1px]" />
      <div className="flex justify-center items-center my-16 md:flex-row flex-col">
        <div className="text-4xl">
          <TypeIt
            options={{
              loop: false,
              speed: 70,
              waitUntilVisible: true,
              cursor: false,
            }}
            getBeforeInit={(instance) => {
              instance
                .type("Mentee?")
                .pause(500)
                .delete(3)
                .pause(500)
                .type("or.");

              return instance;
            }}
          />
        </div>
        <div className="overflow-y-scroll w-full mx-10 h-80">
          {mentor.map((data) => (
            <EnrollCard data={data} key={data.id} isMentor={true} />
          ))}
        </div>
        <div className="text-4xl">
          <TypeIt
            options={{
              loop: false,
              speed: 70,
              waitUntilVisible: true,
              cursor: false,
            }}
            getBeforeInit={(instance) => {
              instance
                .type(`Mentor?`)
                .pause(500)
                .delete(3)
                .pause(500)
                .type("ee.");

              return instance;
            }}
          />
        </div>
        <div className="overflow-y-scroll h-80 w-full mx-20">
          {mentee.map((data) => (
            <EnrollCard data={data} key={data.id} isMentor={false} />
          ))}
        </div>
      </div>
      <div className="w-[100%] dark:bg-white/40 bg-black/40 h-[1px]" />
    </div>
  );
};

export default Enroll;
