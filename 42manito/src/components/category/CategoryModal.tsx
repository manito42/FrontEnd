import { mentorResDto } from "@/Types/MentorProfileDto";
import React, { useEffect, useRef, useState } from "react";
import { mockMentorProfiles } from "../../../mocData/mentorData";
import MentorCard from "../mentor/MentorCard";
import MentorModal from "../mentor/MentorModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "antd";

interface props {
  onClose: () => void;
  isVisible: boolean;
  categoryId: number;
}

const CategoryModal = ({ onClose, isVisible, categoryId }: props) => {
  const [zoomOut, setZoomOut] = useState(false);
  const [open, setOpen] = React.useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currMentor, setCurrMentor] = useState<mentorResDto>(
    {} as mentorResDto
  );
  const [page, setPage] = useState(1);

  const getCategoryMentors = (id: number): mentorResDto[] => {
    return mockMentorProfiles.filter(
      (mentor) => mentor.categories[0].id === id
    );
  };

  const initialMentors = getCategoryMentors(categoryId);

  const [mentorData, setMentorData] = useState<mentorResDto[]>(initialMentors);
  const [mentor, setMentor] = useState<mentorResDto[]>(
    initialMentors.slice(0, 12)
  );

  console.log(categoryId);

  useEffect(() => {
    const newMentors = getCategoryMentors(categoryId);
    setPage(1);
    setMentorData(newMentors);
    setMentor(newMentors.slice(0, 12));
  }, [categoryId]);

  if (!isVisible) return null;

  const fetchMoreData = () => {
    console.log(page);
    setPage(page + 1);
    if (mentor.length >= mentorData.length) {
      return; // 모든 데이터를 불러왔으면 추가로 더 불러오지 않음
    }
    const nextCards = mentorData.slice(mentor.length, mentor.length + 12);
    setMentor([...mentor, ...nextCards]);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "wrapper") handleZoomOut();
  };

  const handleZoomOut = () => {
    setZoomOut(true);
    setTimeout(() => {
      onClose();
      setZoomOut(false);
    }, 300); // 줌아웃 에니메이션 실행 시간을 기다림
  };

  const mentorModalOpen = (data: mentorResDto) => {
    setOpen(true);
    setCurrMentor(data);
  };

  const mentorModalClose = () => {
    setOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full px-5 md:px-20"
      id="wrapper"
    >
      <section
        className={`relative py-16 mentor-modal h-[100vh]  ${
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
        <div className=" px-4">
          <div
            className="relative flex flex-col break-words bg-white dark:bg-slate-700 w-[90vw] h-[80vh] mb-6 shadow-xl rounded-lg p-10 overflow-y-scroll"
            ref={scrollContainerRef}
          >
            <InfiniteScroll
              dataLength={mentor.length}
              next={fetchMoreData}
              hasMore={mentor.length < mentorData.length}
              loader={<h4>로딩중...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <strong>모든 데이터를 불러왔습니다.</strong>
                </p>
              }
            >
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 p-5">
                {mentor.map((mentor) => (
                  <MentorCard
                    data={mentor}
                    key={mentor.id}
                    onOpen={mentorModalOpen}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </section>
      <MentorModal
        isVisible={open}
        onClose={mentorModalClose}
        data={currMentor}
      />
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
