import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";
import { Divider } from "antd";
import Typo from "@/components/home/Typo";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetHomeQuery } from "@/RTK/Apis/Home";

export default function Home() {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
      if (mentorCardData.length % 12 !== 0) {
        setHasMore(false);
        return;
      }
      setPage(page + 1);
      if (mentorCardError) {
        alert("데이터를 불러오는데 실패했습니다.");
        return;
      }
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
            hasMore={hasMore}
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
            <div className="w-[95vw] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-10 p-0 md:p-5 md:w-[80vw]">
              {mentorCardData.map((mentor) => (
                <MentorCard data={mentor} key={mentor.id} />
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
