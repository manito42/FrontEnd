import React from "react";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import dynamic from "next/dynamic";
import { Spin } from "antd";

interface props {
  allMentor: MentorProfileDto[] | undefined;
  children?: React.ReactNode;
}

const MentorCard = dynamic(() => import("@/components/Mentor/Card"));

export default function HomeMentorList({ allMentor, children }: props) {
  const loading = (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  );
  const notExist = (
    <div className="flex items-center justify-center">
      멘토가 존재하지 않습니다.
    </div>
  );
  return (
    <>
      <div className="home-mentor-profile-container">
        {allMentor === undefined && loading}
        {allMentor?.length === 0 && notExist}
        {allMentor !== undefined &&
          allMentor.length !== 0 &&
          allMentor.map((mentor) => (
            <MentorCard data={mentor} key={mentor.user.id} />
          ))}
      </div>
      {children}
    </>
  );
}
