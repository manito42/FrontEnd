import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import { mockMentorProfiles } from "../../mocData/mentorData";
import InfiniteScroll from "react-infinite-scroll-component";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";
import { Divider } from "antd";
import Typo from "@/components/home/Typo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";

export default function Home() {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );

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
    if (currMentorState.openMentorModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [currMentorState.openMentorModal]);

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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-5">
            {mentor.map((mentor) => (
              <MentorCard data={mentor} key={mentor.id} />
            ))}
          </div>
        </InfiniteScroll>
        {currMentorState.openMentorModal && (
          <MentorModal data={currMentorState.currMentor} />
        )}
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold z-50"
      >
        ↑
      </button>
    </Layout>
  );
}
