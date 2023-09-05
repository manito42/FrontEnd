import React from "react";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import dynamic from "next/dynamic";
import { Spin } from "antd";

interface props {
  allMentor: MentorProfileDto[] | undefined;
}

const MentorCard = dynamic(() => import("@/components/Mentor/Card"));

export default function HomeMentorList({ allMentor }: props) {
  if (allMentor === undefined) {
    return (
      <div className="h-[30vh] flex items-center justify-center">
        <Spin />
      </div>
    );
  }
  if (allMentor.length === 0) {
    return (
      <div className="h-[30vh] flex items-center justify-center">
        멘토가 존재하지 않습니다.
      </div>
    );
  }
  return (
    <div className="home-mentor-profile-container">
      {allMentor.map((mentor) => (
        <MentorCard data={mentor} key={mentor.user.id} />
      ))}
    </div>
  );
}
