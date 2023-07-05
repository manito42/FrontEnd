import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "../components/Layout";
import Enroll from "@/components/home/Enroll";
import { useState } from "react";
import { MentorProfileDto } from "@/Types/MentorProfileDto";
import { mockMentorProfiles } from "../../mocData/mentorData";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Spin } from "antd";
import MentorCard from "@/components/MentorCard";
import Mentor from "./Mentor";
import MentroModal from "@/components/mentor/MentorModal";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currMentor, setCurrMentor] = useState<MentorProfileDto>(
    {} as MentorProfileDto
  );
  const onClose = () => {
    setIsVisible(false);
  };
  const onOpen = (data: MentorProfileDto) => {
    setIsVisible(true);
    setCurrMentor(data);
  };
  const [mentor, setMentor] = useState<MentorProfileDto[]>(
    mockMentorProfiles.slice(0, 12)
  );
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    setPage(page + 1);
    if (mentor.length >= mockMentorProfiles.length) {
      return; // 모든 데이터를 불러왔으면 추가로 더 불러오지 않음
    }
    const nextCards = mockMentorProfiles.slice(
      mentor.length,
      mentor.length + 12
    );
    setMentor([...mentor, ...nextCards]);
  };

  return (
    <Layout>
      <div className="app-container">
        <InfiniteScroll
          dataLength={mentor.length}
          next={fetchMoreData}
          hasMore={mentor.length < mockMentorProfiles.length}
          loader={
            <div
              className="example"
              style={{ verticalAlign: "middle", alignContent: "center" }}
            >
              <Spin />
            </div>
          }
        >
          <Enroll />
          <Row style={{ display: "flex", flexWrap: "wrap" }}>
            {mentor.map((mentor) => (
              <div
                className="px-3 mb-10  sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
                key={mentor.id}
                style={{ display: "flex" }}
              >
                <MentorCard data={mentor} key={mentor.id} onOpen={onOpen} />
              </div>
            ))}
          </Row>
        </InfiniteScroll>
        {/* <Mentor isVisible={isVisible} onClose={onClose} data={currMentor} /> */}
        <MentroModal
          isVisible={isVisible}
          onClose={onClose}
          data={currMentor}
        />
      </div>
    </Layout>
  );
}
