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

const Mentoring = () => {
  const banner = [
    {
      head: "멘토링",
      title: "나의 멘토링",
      description: "멘토링 관리 페이지입니다",
      link: "/Guide",
      backgroundColor: "bg-signature_color-500",
      textColor: "text-white",
      image: "/guide.png",
      license:
        "https://kor.pngtree.com/freepng/meb-map-guide_4462396.html' 의 PNG 이미지 kor.pngtree.com",
    },
  ];
  const router = useRouter();
  const uid = useSelector((state: RootState) => state.rootReducers.global.uId);
  const [requestReservationPage, setRequestReservationPage] = useState(0);
  const [activeReservationPage, setActiveReservationPage] = useState(0);
  const [inactiveReservationPage, setInactiveReservationPage] = useState(0);
  const [role, setRole] = useState<ReservationRole>(ReservationRole.ALL);
  const isModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isModalOpen,
  );
  const selectedReservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation,
  );
  const requestQuery = {
    take: 100,
    page: requestReservationPage,
    role: role,
    status: [ReservationStatus.REQUEST, ReservationStatus.ACCEPT],
  };
  const activeQuery = {
    take: 10,
    page: activeReservationPage,
    role: role,
    status: [
      ReservationStatus.MENTEE_FEEDBACK,
      ReservationStatus.MENTEE_CHECKED,
    ],
  };
  const inActiveQuery = {
    take: 10,
    page: inactiveReservationPage,
    role: role,
    status: [ReservationStatus.DONE, ReservationStatus.CANCEL],
  };
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
                query={requestQuery}
                name={"request"}
                emptyMsg={"대기중인 멘토링이 없습니다 🥲"}
              />
              <div className="mentoring-text-header">진행 중인 멘토링</div>
              <ReservationLists
                query={activeQuery}
                name={"active"}
                emptyMsg={"진행중인 멘토링이 없습니다 🥲"}
              />
              <div className="mentoring-text-header">완료된 멘토링</div>
              <ReservationLists
                query={inActiveQuery}
                name={"inactive"}
                emptyMsg={"완료된 멘토링이 없습니다 🥲"}
              />
            </div>
          )}
        </div>
        {isModalOpen && selectedReservation !== null && <ReservationModal />}
      </Layout>
    </>
  );
};

export default Mentoring;
