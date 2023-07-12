import Layout from "@/components/layout/Layout";
import InfoAlert from "@/components/alert/InfoAlert";
import React, { useState } from "react";
import { Divider } from "antd";
import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import { mockMentorProfiles } from "../../mocData/mentorData";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";

const Ranking: React.FC = () => {
  const [isAlert, setIsAlert] = useState(true);
  const mentor: mentorResDto[] = mockMentorProfiles;
  const [isVisible, setIsVisible] = useState(false);
  const [currMentor, setCurrMentor] = useState<mentorResDto>(
    {} as mentorResDto
  );

  const onCloseAlert = () => {
    setIsAlert(false);
    location.href = "/";
  };

  const onOpen = (data: mentorResDto) => {
    setIsVisible(true);
    setCurrMentor(data);
  };

  const onClose = () => {
    setIsVisible(false);
  };

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
                <MentorCard data={mentor[3]} onOpen={onOpen} />
              </div>
              <div className="flex flex-row">
                <div className="md:m-10">
                  <MentorCard data={mentor[29]} onOpen={onOpen} />
                </div>
                <div className="md:m-10">
                  <MentorCard data={mentor[25]} onOpen={onOpen} />
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
                <MentorCard data={mentor[25]} onOpen={onOpen} />
              </div>
              <div className="flex flex-row">
                <div className="md:m-10">
                  <MentorCard data={mentor[18]} onOpen={onOpen} />
                </div>
                <div className="md:m-10">
                  <MentorCard data={mentor[9]} onOpen={onOpen} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MentorModal
          isVisible={isVisible}
          onClose={onClose}
          data={currMentor}
        />
      </Layout>
    </>
  );
};

export default Ranking;
