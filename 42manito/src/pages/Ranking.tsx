import Layout from "@/components/layout/Layout";
import InfoAlert from "@/components/alert/InfoAlert";
import React, { useState } from "react";
import { Divider } from "antd";
import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import { mockMentorProfiles } from "../../mocData/mentorData";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";

const Ranking: React.FC = () => {
  const mentor: mentorResDto[] = mockMentorProfiles;
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );

  return (
    <>
      <Layout>
        <div className="app-container">
          <div
            id="Total."
            className="w-full flex flex-col justify-center items-center"
          >
            <span className="text-5xl font-bold">Total.</span>
            <div className="flex flex-col justify-center items-center md:m-10">
              <div>
                <MentorCard data={mentor[3]} />
              </div>
              <div className="flex flex-row">
                <div className="md:m-10">
                  <MentorCard data={mentor[29]} />
                </div>
                <div className="md:m-10">
                  <MentorCard data={mentor[25]} />
                </div>
              </div>
            </div>
          </div>

          <Divider className="bg-slate-700 dark:bg-slate-200" />
          <div
            id="Month."
            className="w-full flex flex-col justify-center items-center"
          >
            <span className="text-5xl font-bold">Month.</span>
            <div className="flex flex-col justify-center items-center md:m-10">
              <div>
                <MentorCard data={mentor[25]} />
              </div>
              <div className="flex flex-row">
                <div className="md:m-10">
                  <MentorCard data={mentor[18]} />
                </div>
                <div className="md:m-10">
                  <MentorCard data={mentor[9]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {currMentorState.openMentorModal && currMentorState.currMentor.user && (
          <MentorModal />
        )}
      </Layout>
    </>
  );
};

export default Ranking;
