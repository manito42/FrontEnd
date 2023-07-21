import React from "react";
import { mocReservation } from "../../../mocData/mocReservation";
import { ReservationGetDto } from "@/Types/Reservation/Reservations";
import EnrollCard from "./components/ErollCard";
import InfiniteScroll from "react-infinite-scroll-component";
import TypeIt from "typeit-react";
import ProfileTypo from "../Profile/ProfileTypo";

interface props {
  viewProfileTypo: boolean;
}

const Enroll = ({ viewProfileTypo }: props) => {
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
    <div className="w-[90vw] md:w-full">
      <div className="w-full dark:bg-white/40 bg-black/40 h-[1px]" />
      <div className="grid grid-rows-2 xl:grid-cols-2 gap-y-6 xl:gap-y-0 items-center my-16 xl:max-h-[50vh] md:mt-32 lg:-mb-32">
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
          <div className="overflow-y-auto w-full mx-10 max-h-[50vh]">
            {mentor.map((data) => (
              <EnrollCard data={data} key={data.id} isMentor={true} />
            ))}
          </div>
        </div>
        <div className="flex-row justify-center w-full lg:flex items-center mt-16 lg:mt-0">
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
          <div className="overflow-y-auto w-full mx-10 max-h-[50vh]">
            {mentee.map((data) => (
              <EnrollCard data={data} key={data.id} isMentor={false} />
            ))}
          </div>
        </div>
      </div>
      <div className="">{!viewProfileTypo && <ProfileTypo />}</div>
    </div>
  );
};

export default Enroll;
