import FeedbackCard from "@/components/feedback/FeedbackCard";
import Layout from "@/components/layout/Layout";
import React, { useCallback, useEffect, useState } from "react";
import { mocFeedback } from "../../mocData/mocFeedback";
import { useRouter } from "next/router";
import FeedbackPost from "@/components/feedback/FeedbackPost";
import { mocReservation } from "../../mocData/mocReservation";

const Feedback = () => {
  const [feedback, setFeedback] = useState<FeedbackGetDto[]>(
    [] as FeedbackGetDto[]
  );

  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reservation, setReservation] = useState<ReservationGetDto>(
    {} as ReservationGetDto
  );

  const { isFinish, id } = router.query;
  const FeedbackId = Number(id);

  const [loading, setLoading] = useState(true); // loading 상태 추가

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    setFeedback(mocFeedback.filter((feedback) => feedback.mentorId === 1));
    setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 변경
    console.log(feedback);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFinish === "true") {
      setOpenModal(true);
      //TODO: id를 이용해서 reservation 개체를 가져와야함
      const ret = mocReservation.find(
        (reservation) => reservation.id === FeedbackId
      );
      if (ret) {
        setReservation(ret);
      } else {
        setOpenModal(false);
      }
    }
  }, [isFinish, FeedbackId]);

  return (
    <>
      <Layout>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full p-10 md:p-26">
            <span className="flex text-4xl font-bold text-slate-800 dark:text-slate-200 my-10">
              FeedbackLog.
            </span>
            {/* TODO: 추후에 무한스크롤로 구현해야함 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {feedback.map((feedback) => (
                <FeedbackCard data={feedback} key={feedback.id} />
              ))}
            </div>
          </div>
        )}
        <FeedbackPost
          isVisible={openModal}
          onClose={closeModal}
          data={reservation}
        />
      </Layout>
    </>
  );
};

export default Feedback;
