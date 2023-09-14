import Layout from "@/components/Layout/Layout";
import ReservationLists from "@/components/Reservation/ReservationLists";
import React, { useEffect, useState } from "react";
import TopBanner from "@/components/Global/TopBanner";
import { UserReservationResDto } from "@/Types/UserReservation/UserReservationResDto";
import {
  useGetActiveReservationQuery,
  useGetRequestReservationsQuery,
} from "@/RTK/Apis/Reservation";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { ReservationDefaultDto } from "@/Types/Reservations/ReservationDefault.dto";
import { ReservationRole } from "@/components/Reservation/getReservationStatus";
import ReservationModal from "@/components/Reservation/modal/ReservationModal";

const Mentorings = () => {
  const banner = {
    head: "멘토링",
    title: "나의 멘토링",
    description: "멘토링 관리 페이지입니다",
    link: "/Guide",
    backgroundColor: "bg-signature_color-500",
    textColor: "text-white",
    image: "/guide.png",
    license:
      "https://kor.pngtree.com/freepng/meb-map-guide_4462396.html' 의 PNG 이미지 kor.pngtree.com",
  };
  const uid = useSelector((state: RootState) => state.rootReducers.global.uId);
  const [requestReservationPage, setRequestReservationPage] = useState(0);
  const [activeReservationPage, setActiveReservationPage] = useState(0);
  const [inactiveReservationPage, setInactiveReservationPage] = useState(0);
  const [role, setRole] = useState<ReservationRole | "all">("all");
  const isModalOpen = useSelector(
    (state: RootState) => state.rootReducers.reservation.isModalOpen,
  );
  const selectedReservation = useSelector(
    (state: RootState) => state.rootReducers.reservation.selectedReservation,
  );
  const { data: requestResponse }: UserReservationResDto =
    useGetRequestReservationsQuery({ id: uid });
  const { data: activeResponse }: UserReservationResDto =
    useGetActiveReservationQuery({
      id: uid,
      take: 10,
      page: activeReservationPage,
      as_mentor: role === ReservationRole.Mentor || role === "all",
      as_mentee: role === ReservationRole.Mentee || role === "all",
      active: true,
    });
  const { data: inactiveResponse }: UserReservationResDto =
    useGetActiveReservationQuery({
      id: uid,
      take: 10,
      page: inactiveReservationPage,
      as_mentor: role === ReservationRole.Mentor || role === "all",
      as_mentee: role === ReservationRole.Mentee || role === "all",
      active: false,
    });
  const [requestReservations, setRequestReservations] = useState<
    ReservationDefaultDto[]
  >([]);
  const [activeReservations, setActiveReservations] = useState<
    ReservationDefaultDto[]
  >([]);
  const [inactiveReservations, setInactiveReservations] = useState<
    ReservationDefaultDto[]
  >([]);

  /**
   *   id: number; // Uid
   *   take?: number;
   *   page?: number;
   *   as_mentor?: boolean;
   *   as_mentee?: boolean;
   *   active?: boolean; // default: false
   */

  useEffect(() => {
    if (requestResponse) {
      setRequestReservations([
        ...requestResponse.mentorReservations,
        ...requestResponse.menteeReservations,
      ]);
    }
  }, [requestResponse]);
  useEffect(() => {
    if (activeResponse) {
      setActiveReservations([
        ...(activeResponse?.mentorReservations || []),
        ...(activeResponse?.menteeReservations || []),
      ]);
    }
  }, [activeResponse]);
  useEffect(() => {
    if (inactiveResponse) {
      setInactiveReservations([
        ...(inactiveResponse?.mentorReservations || []),
        ...(inactiveResponse?.menteeReservations || []),
      ]);
    }
  }, [inactiveResponse]);

  const handleRoleSelect = (id: string) => {
    if (id === "mentor") {
      setRole(ReservationRole.Mentor);
    } else if (id === "mentee") {
      setRole(ReservationRole.Mentee);
    } else {
      setRole("all");
    }
  };
  /*
   * TODO: UI
   * Top banner (관련 가이드 or 그냥 장식용)
   * 멘토 / 멘티 구분
   * 대기중인 멘토링 요총
   * 진행중인 멘토링
   * 완료된 멘토링 (취소 포함 기능 추가)
   * ReservationRequests 재활용해서 사용해보자.
   *  -> 모바일 뷰에서 여러개 보는데 유리함.
   *  -> 일반 뷰에서도 나쁘지 않다고 생각함. row를 늘려버리거나?
   * TODO: Modal
   * + Reservation Modal 뜰 수 있도록 처리해야함.
   *   + Home 쪽에서 뜨는거랑 겹치지 않도록 잘 관리해야함.
   * */
  return (
    <>
      <Layout>
        <div className="app-container">
          <TopBanner banner={banner} />
          <div className="mentoring-wrapper">
            <div className="mentoring-select-role">
              <div
                className={`mentoring-select-role-header ${
                  role === "all" ? "active-role" : "inactive-role"
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
                  role === ReservationRole.Mentor
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
                  role === ReservationRole.Mentee
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
              reservations={requestReservations}
              name={"request"}
              emptyMsg={"대기중인 멘토링이 없습니다 🥲"}
            />
            <div className="mentoring-text-header">진행 중인 멘토링</div>
            <ReservationLists
              reservations={activeReservations}
              name={"active"}
              emptyMsg={"진행중인 멘토링이 없습니다 🥲"}
            />
            <div className="mentoring-text-header">완료된 멘토링</div>
            <ReservationLists
              reservations={inactiveReservations}
              name={"inactive"}
              emptyMsg={"완료된 멘토링이 없습니다 🥲"}
            />
          </div>
        </div>
        {isModalOpen && selectedReservation !== null && <ReservationModal />}
      </Layout>
    </>
  );
};

export default Mentorings;
