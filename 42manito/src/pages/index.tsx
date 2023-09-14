import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import dynamic from "next/dynamic";
import { initAllMentor } from "@/RTK/Slices/Home";
import { signIn } from "@/RTK/Slices/Global";
import { useMentorModal } from "@/hooks/Mentor/MentorModal";
import { useFetchHome } from "@/hooks/Home/FetchHome";
import ReservationLists from "@/components/Reservation/ReservationLists";
import TopBanner from "@/components/Global/TopBanner";
import { useGetCategoriesQuery } from "@/RTK/Apis/Category";
import CategoryIconList from "@/components/Home/CategoryIconList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import MentorCard from "@/components/Mentor/Card";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";
import ReservationModal from "@/components/Reservation/modal/ReservationModal";
import { useGetRequestReservationsQuery } from "@/RTK/Apis/Reservation";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";

const MentorModal = dynamic(() => import("@/components/Mentor/Modal"));

export default function Home() {
  const dispatch = useAppDispatch();
  const OwnerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const { data: Categories } = useGetCategoriesQuery();
  const { currMentorState } = useMentorModal();
  const { newMentor, fetchNewCategory, fetchMoreData } =
    useFetchHome(categoryId);
  const [mentorList, setMentorList] = useState<MentorProfileDto[] | undefined>(
    undefined,
  );
  const isModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isModalOpen,
  );
  const selectedReservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation,
  );
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const { data: response } = useGetRequestReservationsQuery({ id: userId });
  const [reservations, setReservationRequests] = useState<
    ReservationDefaultDto[]
  >([]);

  useEffect(() => {
    if (response) {
      setReservationRequests([
        ...response.menteeReservations,
        ...response.mentorReservations,
      ]);
    }
  }, [response]);

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
  const banner = {
    head: "가이드",
    title: "마니또가 처음이신가요?",
    description: "가이드와 함께 멘토링을 시작해보세요!",
    link: "/Guide",
    backgroundColor: "bg-signature_color-500",
    textColor: "text-white",
    image: "/guide.png",
    license:
      "https://kor.pngtree.com/freepng/meb-map-guide_4462396.html' 의 PNG 이미지 kor.pngtree.com",
  };

  return (
    <Layout>
      <div className="app-container">
        <TopBanner banner={banner} />
        <div className="home">
          <div className="temp-spacer">
            {OwnerId !== 0 && (
              <div className="home-reservation-request-wrapper">
                <div className="home-text-header">대기 중인 멘토링</div>
                <div className="home-text-detail">
                  멘토링 요청들을 확인해보세요
                </div>
                <ReservationLists
                  reservations={reservations}
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
        {isModalOpen && selectedReservation !== null && <ReservationModal />}
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
