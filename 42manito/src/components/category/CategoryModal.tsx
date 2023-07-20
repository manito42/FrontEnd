import { mentorResDto } from "@/Types/Mentor/MentorProfileDto";
import React, { useEffect, useRef, useState } from "react";
import { mockMentorProfiles } from "../../../mocData/mentorData";
import MentorCard from "../mentor/MentorCard";
import MentorModal from "../mentor/MentorModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetCategoryQuery } from "@/RTK/Apis/Category";

interface props {
  onClose: () => void;
  isVisible: boolean;
  categoryId: number;
}

const CategoryModal = ({ onClose, isVisible, categoryId }: props) => {
  const [zoomOut, setZoomOut] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currMentorState = useSelector(
    (state: RootState) => state.rootReducers.currMentor
  );

  const {
    data: mentorCardData,
    isError: mentorCardError,
    isLoading: mentorCardLoading,
    refetch,
  } = useGetCategoryQuery({ take: 12, page: page, category_id: categoryId });

  if (!isVisible) return null;

  const fetchMoreData = () => {
    if (mentorCardData) {
      if (mentorCardData.length % 12 !== 0) {
        setHasMore(false);
        return;
      }
    }
  };
  const handleZoomOut = () => {
    setZoomOut(true);
    setTimeout(() => {
      onClose();
      setZoomOut(false);
    }, 300); // 줌아웃 에니메이션 실행 시간을 기다림
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full px-5 md:px-20 h-[100vh]"
      id="wrapper"
    >
      <section
        className={`relative py-16 mentor-modal h-[100vh] md:top-[5.4em]   ${
          zoomOut && "close-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-5xl absolute top-0 right-5 -mb-5"
          onClick={handleZoomOut}
        >
          X
        </button>
        <div className="px-4">
          <div
            className="relative flex flex-col break-words bg-white dark:bg-slate-700 w-[90vw] h-[80vh] mb-6 shadow-xl rounded-lg p-10 overflow-y-scroll"
            ref={scrollContainerRef}
          >
            {mentorCardData && !mentorCardLoading && (
              <InfiniteScroll
                dataLength={mentorCardData.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>로딩중...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <strong>모든 데이터를 불러왔습니다.</strong>
                  </p>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5 p-5">
                  {mentorCardData.map((mentor) => (
                    <MentorCard data={mentor} key={mentor.id} />
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </section>
      {currMentorState.openMentorModal && currMentorState.currMentor.user && (
        <MentorModal />
      )}
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold"
        style={{ zIndex: 1000 }}
      >
        ↑
      </button>
    </div>
  );
};
export default CategoryModal;
