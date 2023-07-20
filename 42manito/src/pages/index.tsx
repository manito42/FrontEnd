import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { mockMentorProfiles } from "../../mocData/mentorData";
import InfiniteScroll from "react-infinite-scroll-component";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";
import { Divider } from "antd";
import Typo from "@/components/home/Typo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetHomeQuery } from "@/RTK/Apis/Home";
import { isAllOf } from "@reduxjs/toolkit";

export default function Home() {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const [page, setPage] = useState(1);

  const {
    data: mentorCardData,
    isError: mentorCardError,
    isLoading: mentorCardLoading,
    refetch,
  } = useGetHomeQuery({ take: 12, page: page });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchMoreData = () => {
    if (mentorCardData) {
      if (mentorCardData?.length % 12 !== 0) {
        return;
      }
      setPage(page + 1);
    }
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
        {mentorCardData && !mentorCardLoading && (
          <InfiniteScroll
            dataLength={mentorCardData.length}
            next={fetchMoreData}
            hasMore={mentorCardData.length % 12 !== 0}
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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-5 w-[80vw]">
              {mentorCardData.map((mentor) => (
                <MentorCard data={mentor} key={mentor.mentorProfile.id} />
              ))}
            </div>
          </InfiniteScroll>
        )}
        {currMentorState.openMentorModal && currMentorState.currMentor.user && (
          <MentorModal />
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
