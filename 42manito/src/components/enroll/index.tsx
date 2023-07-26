import React from "react";
import EnrollCard from "./components/Card";
import TypeIt from "typeit-react";
import ProfileTypo from "../Profile/Typo";
import { RootState, useAppDispatch } from "@/RTK/store";
import { useGetEnrollQuery } from "@/RTK/Apis/Enroll";
import { Spin } from "antd";
import { useSelector } from "react-redux";

interface props {
  viewProfileTypo: boolean;
}

const Enroll = ({ viewProfileTypo }: props) => {
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const { data, isLoading, error } = useGetEnrollQuery({ id: Owner });
  // TODO: users/id/reservation으로 불러와서 해야함

  if (isLoading) {
    return <Spin />;
  }
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
            {data?.mentorReservations.map((data) => (
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
            {data?.menteeReservations.map((data) => (
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
