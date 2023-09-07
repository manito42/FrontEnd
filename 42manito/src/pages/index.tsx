import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import dynamic from "next/dynamic";
import { initAllMentor } from "@/RTK/Slices/Home";
import { signIn } from "@/RTK/Slices/Global";
import { useMentorModal } from "@/hooks/Mentor/MentorModal";
import { useFetchHome } from "@/hooks/Home/FetchHome";
import ReservationRequests from "@/components/Home/ReservationRequests";
import TopBanner from "@/components/Global/TopBanner";
import { useGetCategoriesQuery } from "@/RTK/Apis/Category";
import CategoryIconList from "@/components/Home/CategoryIconList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import MentorCard from "@/components/Mentor/Card";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";

const MentorModal = dynamic(() => import("@/components/Mentor/Modal"));

export default function Home() {
  const dispatch = useAppDispatch();
  const OwnerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const { data: Categories } = useGetCategoriesQuery();
  const currMentorState = useMentorModal();
  const { newMentor, isLoading, fetchNewCategory, fetchMoreData } =
    useFetchHome(categoryId);
  const [mentorList, setMentorList] = useState<MentorProfileDto[]>([]);

  useEffect(() => {
    if (OwnerId === 0) {
      const id = localStorage.getItem("uid");
      if (id !== null) {
        dispatch(signIn(Number(id)));
      }
    }
    return () => {
      dispatch(initAllMentor());
    };
  }, [OwnerId, dispatch]);

  useEffect(() => {
    fetchNewCategory();
    setHasMore(true);
    return () => {
      setMentorList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (newMentor && !isLoading) {
      if (newMentor.length < 12) {
        setHasMore(false);
      }
      if (mentorList) {
        setMentorList([...mentorList, ...newMentor]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMentor, isLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  // 아직 테스트해야할게 많음 특히 Auth, ProfileUpdate
  return (
    <Layout>
      <div className="app-container">
        <TopBanner
          title="42를 위한 멘토링 플랫폼"
          description="42 마니또 (임시 배너 입니다. 다른 컴포넌트 들어올 수도 있습니다.)"
        />
        <div className="home">
          <div className="temp-spacer">
            {OwnerId !== 0 && (
              <div className="home-reservation-request-wrapper">
                <div className="home-text-header">대기 중인 멘토링</div>
                <div className="home-text-detail">
                  멘토링 요청들을 확인해보세요
                </div>
                <ReservationRequests />
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
          {mentorList === undefined && <Spin />}
          {mentorList && mentorList.length === 0 && (
            <div className="mentor-cards-container mt-10 mb-20">
              {"해당 영역의 멘토가 존재하지 않습니다."}
            </div>
          )}
          {mentorList && mentorList.length !== 0 && (
            <InfiniteScroll
              dataLength={mentorList.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Spin />}
              height={"100%"}
            >
              <div className="mentor-cards-container">
                {mentorList.map((mentor) => (
                  <MentorCard data={mentor} key={mentor.id} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
        {currMentorState.openMentorModal && currMentorState.currMentor.user && (
          <MentorModal />
        )}
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
