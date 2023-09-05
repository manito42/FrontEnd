import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import { Spin } from "antd";
import MentorCard from "@/components/Mentor/Card";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface props {
  searchMentors: MentorProfileDto[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

export default function SearchMentorList({
  searchMentors,
  fetchMoreData,
  hasMore,
}: props) {
  return (
    <InfiniteScroll
      dataLength={searchMentors.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spin />}
      height={"100%"}
    >
      <div className="mentor-cards-container">
        {searchMentors.map((mentor) => (
          <MentorCard data={mentor} key={mentor.id} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
