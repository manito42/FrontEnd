import { useGetSearchMutation } from "@/RTK/Apis/Search";
import {
  initSearchResult,
  setHasMore,
  setSearchPage,
  setSearchResult,
} from "@/RTK/Slices/Search";
import { RootState, useAppDispatch } from "@/RTK/store";
import Layout from "@/components/layout/Layout";
import MentorCard from "@/components/mentor/MentorCard";
import MentorModal from "@/components/mentor/MentorModal";
import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const Search: React.FC = () => {
  const router = useRouter();
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
  const page = useSelector(
    (state: RootState) => state.rootReducers.search.page
  );
  const hasMore = useSelector(
    (state: RootState) => state.rootReducers.search.hasMore
  );

  const { search } = router.query;
  console.log(search);

  useEffect(() => {
    if (search) {
      SearchMutation({ search_string: search as string, take: 12, page: page });
      dispatch(setSearchPage(page + 1));
    }
  }, [search]);

  const fetchMoreData = () => {
    if (search) {
      SearchMutation({ search_string: search as string, take: 12, page: page });
      dispatch(setSearchPage(page + 1));
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setSearchResult(data));
      if (data.length % 12 !== 0 || data.length === 0) {
        dispatch(setHasMore(false));
      }
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      dispatch(initSearchResult());
      dispatch(setSearchPage(0));
      dispatch(setHasMore(true));
    };
  }, []);

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
