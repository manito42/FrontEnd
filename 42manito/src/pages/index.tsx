import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import dynamic from "next/dynamic";
import { initAllMentor } from "@/RTK/Slices/Home";
import { signIn } from "@/RTK/Slices/Global";
import HomeMentorList from "@/components/Home/MentorList";
import { useMentorModal } from "@/hooks/Mentor/MentorModal";
import { useFetchHome } from "@/hooks/Home/FetchHome";

const MentorModal = dynamic(() => import("@/components/Mentor/Modal"));

export default function Home() {
  const dispatch = useAppDispatch();
  const OwnerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );

  const currMentorState = useMentorModal();
  const { allMentor, fetchMoreData, hasMore } = useFetchHome();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 아직 테스트해야할게 많음 특히 Auth, ProfileUpdate
  return (
    <Layout>
      <div className="app-container home">
        {allMentor && (
          <HomeMentorList
            allMentor={allMentor}
            fetchMoreData={fetchMoreData}
            hasMore={hasMore}
          />
        )}
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
