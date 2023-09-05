import Layout from "../components/Layout/Layout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import dynamic from "next/dynamic";
import { initAllMentor } from "@/RTK/Slices/Home";
import { signIn } from "@/RTK/Slices/Global";
import HomeMentorList from "@/components/Home/MentorList";
import { useMentorModal } from "@/hooks/Mentor/MentorModal";
import { useFetchHome } from "@/hooks/Home/FetchHome";
import ReservationRequests from "@/components/Home/ReservationRequests";
import TopBanner from "@/components/Global/TopBanner";
import { useGetCategoriesQuery } from "@/RTK/Apis/Category";
import CategoryIconList from "@/components/Home/CategoryIconList";
import Link from "next/link";

const MentorModal = dynamic(() => import("@/components/Mentor/Modal"));

export default function Home() {
  const dispatch = useAppDispatch();
  const OwnerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const { data: Categories } = useGetCategoriesQuery();
  const currMentorState = useMentorModal();
  const { allMentor, fetchNewCategory } = useFetchHome(categoryId);

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
    return () => {
      dispatch(initAllMentor());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, dispatch]);

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
                <ReservationRequests />
              </div>
            )}
          </div>
          <div className="home-text-header">멘토를 찾아보세요!</div>
          <div className="home-category-wrapper">
            <div className="home-text-detail">
              원하는 영역의 멘토를 골라보세요!
            </div>
            <CategoryIconList
              categories={Categories}
              categoryClickHandler={handleCategoryClick}
            />
          </div>
        </div>
        <div className="home-mentor-profile-list">
          <HomeMentorList allMentor={allMentor}>
            <div className="home-mentor-profile-footer">
              <Link
                href="/Categories"
                className="home-mentor-profile-footer-text"
              >
                {"더 많은 멘토 보기 >>"}{" "}
              </Link>
            </div>
          </HomeMentorList>
        </div>
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
