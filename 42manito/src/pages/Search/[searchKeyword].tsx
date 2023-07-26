import { RootState } from "@/RTK/store";
import Layout from "@/components/Layout/Layout";
import MentorModal from "@/components/Mentor/Modal";
import SearchMentorList from "@/components/Search/MentorList";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchSearch } from "@/hooks/Search/FetchSearch";

const Search: React.FC = () => {
  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );
  const { searchMentors, hasMore, fetchMoreData } = useFetchSearch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <SearchMentorList
              searchMentors={searchMentors}
              fetchMoreData={fetchMoreData}
              hasMore={hasMore}
            />
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
