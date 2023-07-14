import React from "react";
import { mocReservation } from "../../../mocData/mocReservation";
import { ReservationGetDto } from "@/Types/Reservation/Reservations";
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

  return (
    <div className="my-16 w-full h-[40vh]">
      <div className="w-[100%] dark:bg-white/40 bg-black/40 h-[1px]" />
      <div className="grid grid-rows-2 lg:grid-cols-2 gap-y-6 lg:gap-y-0 items-center my-16 md:flex-row flex-col">
        <div className="flex-row justify-center w-full lg:flex items-center">
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
          <div className="overflow-y-auto w-full mx-10 h-[30vh]">
            {mentor.map((data) => (
              <EnrollCard data={data} key={data.id} isMentor={true} />
            ))}
          </div>
        </div>
        <div className="flex-row justify-center w-full lg:flex items-center ">
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
          <div className="overflow-y-auto w-full mx-10 h-[30vh]">
            {mentee.map((data) => (
              <EnrollCard data={data} key={data.id} isMentor={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
