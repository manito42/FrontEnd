import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetCategoryMentorsMutation } from "@/RTK/Apis/Category";
import { RootState, useAppDispatch } from "@/RTK/store";
import { useSelector } from "react-redux";
import { initCategoryMentors, setCategoryMentors } from "@/RTK/Slices/Category";
import { Spin } from "antd";
import dynamic from "next/dynamic";

interface props {
  onClose: () => void;
  categoryId: number;
}

const MentorCard = dynamic(() => import("@/components/mentor/MentorCard"), {
  loading: () => <Spin />,
});

const CategoryModal = ({ onClose, categoryId }: props) => {
  const [zoomOut, setZoomOut] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [getMentors, { data, isLoading, error }] =
    useGetCategoryMentorsMutation();
  const categoriesMentors = useSelector(
    (state: RootState) => state.rootReducers.category.categoryMentors
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setPage(0);
      setHasMore(true);
    };
  }, []);

  const fetchMoreData = () => {
    getMentors({ take: 12, page: page, category_id: categoryId });
    setPage(page + 1);
  };

  const handleZoomOut = () => {
    setZoomOut(true);
    setTimeout(() => {
      onClose();
      setZoomOut(false);
      dispatch(initCategoryMentors());
      setPage(0);
      setHasMore(true);
    }, 300); // 줌아웃 에니메이션 실행 시간을 기다림
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    // 첫 페이지 데이터 불러오기.
    getMentors({ take: 12, page: 0, category_id: categoryId });
    setPage(page + 1);
  }, [categoryId]);

  useEffect(() => {
    if (data && !error) {
      dispatch(setCategoryMentors(data));
      if (data.length % 12 !== 0 || data.length === 0) {
        setHasMore(false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      dispatch(initCategoryMentors());
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-[100vw] px-5 md:px-20 h-[100vh]"
      id="wrapper"
    >
      <section
        className={`relative py-16  h-[100vh] md:top-[5.4em]   ${
          zoomOut ? "close-modal" : "mentor-modal"
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
            className="relative flex flex-col break-words bg-white dark:bg-slate-700 w-[95vw] md:w-[90vw] h-[80vh] md:mb-6 shadow-xl rounded-lg p-3 md:p-10 overflow-y-scroll"
            ref={scrollContainerRef}
          >
            {categoriesMentors && !isLoading && (
              <InfiniteScroll
                dataLength={categoriesMentors.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spin></Spin>}
              >
                <div className="w-[90vw] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-10 p-0 md:p-5 md:w-[80vw]">
                  {categoriesMentors.map((mentor) => (
                    <MentorCard data={mentor} key={mentor.id} />
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </section>
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
