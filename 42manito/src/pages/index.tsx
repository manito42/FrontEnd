import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import { useGetMentorsMutation } from "@/RTK/Apis/Home";
import dynamic from "next/dynamic";
import { initAllMentor, setAllMentor } from "@/RTK/Slices/Home";

const Typo = dynamic(() => import("@/components/home/Typo"));
const MentorCard = dynamic(() => import("@/components/mentor/MentorCard"));
const MentorModal = dynamic(() => import("@/components/mentor/MentorModal"));

export default function Home() {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const allMentor = useSelector(
    (state: RootState) => state.rootReducers.home.allMentor
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [getMentors, { data, isLoading, error }] = useGetMentorsMutation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchMoreData = () => {
    getMentors({ take: 12, page: page });
    setPage(page + 1);
  };

  useEffect(() => {
    if (currMentorState.openMentorModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [currMentorState.openMentorModal]);

  useEffect(() => {
    if (data && !error) {
      dispatch(setAllMentor(data));
      if (data.length % 12 !== 0 || data.length === 0) {
        setHasMore(false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      dispatch(initAllMentor());
    };
  }, []);

  return (
    <Layout>
      <div className="app-container home">
        {allMentor && (
          <InfiniteScroll
            dataLength={allMentor.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spin />}
            className="overflow-none overscroll-y-none overflow-hidden"
          >
            <Typo />
            <Divider className="divider" />
            <div className="home-space" />
            <div className="mentor-cards-container">
              {allMentor.map((mentor) => (
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
