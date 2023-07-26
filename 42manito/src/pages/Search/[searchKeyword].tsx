import { useGetSearchMutation } from "@/RTK/Apis/Search";
import { initSearchResult, setSearchResult } from "@/RTK/Slices/Search";
import { RootState, useAppDispatch } from "@/RTK/store";
import Layout from "@/components/Layout/Layout";
import MentorCard from "@/components/Mentor/Card";
import MentorModal from "@/components/Mentor/Modal";
import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const Search: React.FC = () => {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [SearchMutation, { data, isLoading, error }] = useGetSearchMutation();
  const searchMentors = useSelector(
    (state: RootState) => state.rootReducers.search.searchResult
  );
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dispatch = useAppDispatch();

  const { searchKeyword } = router.query;

  const fetchMoreData = () => {
    if (searchKeyword) {
      SearchMutation({
        search_string: searchKeyword as string,
        take: 12,
        page: page,
      });
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setSearchResult(data));
      if (data.length % 12 !== 0 || data.length === 0) {
        setHasMore(false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    fetchMoreData();
    return () => {
      setPage(0);
      setHasMore(true);
      dispatch(initSearchResult());
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (currMentorState.openMentorModal) {
      document.body.style.overflowY = "hidden";
      if (htmlElement) {
        htmlElement.style.overflowY = "hidden";
      }
    } else {
      document.body.style.overflowY = "unset";
      if (htmlElement) {
        htmlElement.style.overflowY = "unset";
      }
    }
  }, [currMentorState.openMentorModal]);

  return (
    <>
      <Layout>
        <div className="app-container search">
          {searchMentors.length <= 0 ? (
            <span>검색결과가 없습니다.</span>
          ) : (
            <InfiniteScroll
              dataLength={searchMentors.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Spin />}
            >
              <div className="mentor-cards-container">
                {searchMentors.map((mentor) => (
                  <MentorCard data={mentor} key={mentor.id} />
                ))}
              </div>
            </InfiniteScroll>
          )}
          {currMentorState.openMentorModal &&
            currMentorState.currMentor.user && <MentorModal />}
        </div>
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold z-50"
        >
          ↑
        </button>
      </Layout>
    </>
  );
};

export default Search;
