import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Spin } from "antd";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import dynamic from "next/dynamic";
import Enroll from "../Enroll";

interface props {
  allMentor: MentorProfileDto[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

const MentorCard = dynamic(() => import("@/components/Mentor/Card"));
const Typo = dynamic(() => import("@/components/Home/Typo"));

export default function HomeMentorList({
  allMentor,
  fetchMoreData,
  hasMore,
}: props) {
  return (
    <InfiniteScroll
      dataLength={allMentor.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spin />}
      className="overflow-none overscroll-y-none overflow-hidden"
    >
      <Enroll />
      <div className="home-space" />
      <div className="mentor-cards-container">
        {allMentor.map((mentor) => (
          <MentorCard data={mentor} key={mentor.user.id} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
