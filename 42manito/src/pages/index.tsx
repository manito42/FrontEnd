import Layout from "../components/layout/Layout";
import Enroll from "@/components/enroll/Enroll";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);

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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 p-5">
            {mentor.map((mentor) => (
              <MentorCard data={mentor} key={mentor.id} onOpen={onOpen} />
            ))}
          </div>
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
        className="fixed bottom-5 right-5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold"
        style={{ zIndex: 1000 }}
      >
        ↑
      </button>
    </Layout>
  );
}
