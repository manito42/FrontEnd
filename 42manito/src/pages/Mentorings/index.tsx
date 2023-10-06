import Layout from "@/components/Layout/Layout";
import ReservationLists from "@/components/Reservation/ReservationLists";
import React, { useState } from "react";
import TopBanner from "@/components/Banners/TopBanner";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import ReservationModal from "@/components/Reservation/modal/ReservationModal";
import { ReservationRole } from "@/Types/Reservations/ReservationRole";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { useRouter } from "next/router";
import Loading from "@/components/Global/Loading";
import FeedbackModal from "@/components/Reservation/modal/FeedbackModal";
import CancelModal from "@/components/Cancel/CancelModal";

const Mentoring = () => {
  const banner = [
    {
      head: "멘토링",
      title: "나의 멘토링",
      description: "멘토링 관리 페이지입니다",
      link: "/Guide",
      backgroundColor: "bg-signature_color-500",
      textColor: "text-white",
      // image: "/guide.png",
      // license:
      //   "https://kor.pngtree.com/freepng/meb-map-guide_4462396.html' 의 PNG 이미지 kor.pngtree.com",
    },
  ];
  const router = useRouter();
  const uid = useSelector((state: RootState) => state.rootReducers.global.uId);
  const [role, setRole] = useState<ReservationRole>(ReservationRole.ALL);
  const isReservationModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isReservationModalOpen,
  );
  const isFeedbackModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isFeedbackModalOpen,
  );
  const isCancelModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isCancelModalOpen,
  );
  const handleRoleSelect = (id: string) => {
    if (id === "mentor") {
      setRole(ReservationRole.MENTOR);
    } else if (id === "mentee") {
      setRole(ReservationRole.MENTEE);
    } else {
      setRole(ReservationRole.ALL);
    }
  };

  if (typeof window !== "undefined" && uid === 0) {
    alert("로그인이 필요합니다");
    router.push("/");
  }

  return (
    <>
      <Layout>
        <div className="app-container">
          <TopBanner banner={banner} />
          {uid === null && <Loading />}
          {!!uid && (
            <div className="mentoring-wrapper">
              <div className="mentoring-select-role">
                <div
                  className={`mentoring-select-role-header ${
                    role === ReservationRole.ALL
                      ? "active-role"
                      : "inactive-role"
                  }`}
                  id="all"
                  onClick={(e) => {
                    handleRoleSelect(e.currentTarget.id);
                  }}
                >
                  전체
                </div>
                <div
                  className={`mentoring-select-role-header ${
                    role === ReservationRole.MENTOR
                      ? "active-role"
                      : "inactive-role"
                  }`}
                  id="mentor"
                  onClick={(e) => {
                    handleRoleSelect(e.currentTarget.id);
                  }}
                >
                  멘토
                </div>
                <div
                  className={`mentoring-select-role-header ${
                    role === ReservationRole.MENTEE
                      ? "active-role"
                      : "inactive-role"
                  }`}
                  id="mentee"
                  onClick={(e) => {
                    handleRoleSelect(e.currentTarget.id);
                  }}
                >
                  멘티
                </div>
              </div>
              <div className="mentoring-text-header">대기 중인 멘토링</div>
              <ReservationLists
                take={10}
                role={role}
                status={[ReservationStatus.REQUEST, ReservationStatus.ACCEPT]}
                name={"request"}
                emptyMsg={"대기 중인 멘토링이 없습니다 🥲"}
                pagination={true}
              />
              <div className="mentoring-text-header">진행 중인 멘토링</div>
              <ReservationLists
                take={10}
                role={role}
                status={[
                  ReservationStatus.MENTEE_CHECKED,
                  ReservationStatus.MENTEE_FEEDBACK,
                ]}
                name={"active"}
                emptyMsg={"진행 중인 멘토링이 없습니다 🥲"}
                pagination={true}
              />
              <div className="mentoring-text-header">완료한 멘토링</div>
              <ReservationLists
                take={10}
                role={role}
                status={[ReservationStatus.DONE]}
                name={"done"}
                emptyMsg={"완료한 멘토링이 없습니다 🥲"}
                pagination={true}
              />
              <div className="mentoring-text-header">취소한 멘토링</div>
              <ReservationLists
                take={10}
                role={role}
                status={[ReservationStatus.CANCEL]}
                name={"cancel"}
                emptyMsg={"취소한 멘토링이 없습니다 😀"}
                pagination={true}
              />
            </div>
          )}
        </div>
        {isReservationModalOpen && <ReservationModal />}
        {isFeedbackModalOpen && <FeedbackModal />}
        {isCancelModalOpen && <CancelModal />}
      </Layout>
    </>
  );
};

export default Mentoring;
