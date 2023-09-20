import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import dynamic from "next/dynamic";
import { useMentorModal } from "@/hooks/Mentor/MentorModal";
import { useFetchHome } from "@/hooks/Home/FetchHome";
import ReservationLists from "@/components/Reservation/ReservationLists";
import TopBanner from "@/components/Banners/TopBanner";
import { useGetCategoriesQuery } from "@/RTK/Apis/Category";
import CategoryIconList from "@/components/Home/CategoryIconList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import MentorCard from "@/components/Mentor/Card";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import ReservationModal from "@/components/Reservation/modal/ReservationModal";
import { BannersData } from "@/components/Banners/Banners";
import { ReservationRole } from "@/Types/Reservations/ReservationRole";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";

const MentorModal = dynamic(() => import("@/components/Mentor/Modal"));

export default function Home() {
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const { data: Categories } = useGetCategoriesQuery();
  const { currMentorState } = useMentorModal();
  const { newMentor, fetchNewCategory, fetchMoreData } =
    useFetchHome(categoryId);
  const [mentorList, setMentorList] = useState<MentorProfileDto[] | undefined>(
    undefined
  );
  const isReservationModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isReservationModalOpen
  );
  const requestQuery = {
    take: 100,
    page: 0,
    role: ReservationRole.ALL,
    status: [ReservationStatus.REQUEST, ReservationStatus.ACCEPT],
  };

  useEffect(() => {
    setHasMore(true);
    fetchNewCategory();
    setMentorList(undefined);
    return () => {
      setMentorList(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    if (newMentor) {
      if (newMentor.length < 12) {
        setHasMore(false);
      }
      if (mentorList) {
        setMentorList([...mentorList, ...newMentor]);
      } else {
        setMentorList(newMentor);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMentor]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  // 별도로 운영자가 밖에서 들고와서  완리할 수 있게 해두면 좋을 것 같음
  return (
    <Layout>
      <div className="app-container">
        <TopBanner banner={BannersData} />
        <div className="home">
          <div className="temp-spacer">
            {!!userId && (
              <div className="home-reservation-request-wrapper">
                <div className="home-text-header">대기 중인 멘토링</div>
                <div className="home-text-detail">
                  멘토링 요청들을 확인해보세요
                </div>
                <ReservationLists
                  take={requestQuery.take}
                  role={requestQuery.role}
                  status={requestQuery.status}
                  name={"home-request"}
                  emptyMsg={"대기 중인 멘토링이 없습니다 🥲"}
                />
              </div>
            )}
          </div>
          <div className="home-text-header">당신을 기다리는 멘토들</div>
          <div className="home-category-wrapper">
            <div className="home-text-detail">
              원하는 영역의 멘토를 찾아보세요
            </div>
            <CategoryIconList
              categories={Categories}
              categoryClickHandler={handleCategoryClick}
            />
          </div>
        </div>
        <div className="home-mentor-profile-list">
          {mentorList === undefined && (
            <div className="mentor-cards-container">
              <Spin />
            </div>
          )}
          {mentorList && mentorList.length === 0 && (
            <div className="mentor-cards-container mt-10 mb-20">
              <div className="flex justify-center items-center w-full">
                해당 영역의 멘토가 존재하지 않습니다.
              </div>
            </div>
          )}
          {mentorList && mentorList.length !== 0 && (
            <InfiniteScroll
              dataLength={mentorList.length}
              next={fetchMoreData}
              hasMore={hasMore}
              scrollThreshold={0.9}
              style={{ overflow: "hidden" }}
              loader={
                <div className="flex justify-center">
                  <Spin />
                </div>
              }
            >
              <div className="mentor-cards-container">
                {mentorList.map((mentor, idx) => (
                  <MentorCard data={mentor} key={idx} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
        {currMentorState.openMentorModal && currMentorState.currMentor.user && (
          <MentorModal />
        )}
        {isReservationModalOpen && <ReservationModal />}
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 rounded-full
                bg-signature_color-500 dark:bg-signature_color-600
                hover:bg-signature_color-600 dark:hover:bg-signature_color-500
                text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold z-50"
        >
          ↑
        </button>
      </div>
    </Layout>
  );
}
