import Layout from "../components/layout/Layout";
import Enroll from "@/components/enroll/Enroll";
import { useState } from "react";
import { mentorResDto } from "@/Types/MentorProfileDto";
import { mockMentorProfiles } from "../../mocData/mentorData";
import InfiniteScroll from "react-infinite-scroll-component";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";
import { Divider, Row } from "antd";
import Typo from "@/components/home/Typo";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currMentor, setCurrMentor] = useState<mentorResDto>(
    {} as mentorResDto
  );

  const onClose = () => {
    setIsVisible(false);
  };

  const onOpen = (data: mentorResDto) => {
    setIsVisible(true);
    setCurrMentor(data);
  };

  const [mentor, setMentor] = useState<mentorResDto[]>(
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              로딩중.
            </div>
          }
        >
          <Typo />
          <Divider className="dark:bg-slate-400 bg-slate-500 " />
          <div className="my-[20vh]" />
          <Row
            style={{ display: "flex", flexWrap: "wrap", marginTop: "3em" }}
            className="mt-10"
          >
            {mentor.map((mentor) => (
              <div
                className="px-3 mb-10  xs:w-1/3 md:w-1/3 lg:w-1/4"
                key={mentor.id}
                style={{ display: "flex" }}
              >
                <MentorCard data={mentor} key={mentor.id} onOpen={onOpen} />
              </div>
            ))}
          </Row>
        </InfiniteScroll>
        {/* <Mentor isVisible={isVisible} onClose={onClose} data={currMentor} /> */}
        <MentorModal
          isVisible={isVisible}
          onClose={onClose}
          data={currMentor}
        />
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 h-10 w-10 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center"
        style={{ zIndex: 1000 }}
      >
        ↑
      </button>
    </Layout>
  );
}
