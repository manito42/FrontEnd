import Layout from "@/components/Layout/Layout";
import React from "react";

const Feedback = () => {
  // const [feedback, setFeedback] = useState<MenteeFeedbacksResDto[]>(
  //   [] as MenteeFeedbacksResDto[]
  // );

  // const router = useRouter();
  // const [openModal, setOpenModal] = useState<boolean>(false);
  // // const [reservation, setReservation] = useState<ReservationGetDto>(
  // //   {} as ReservationGetDto
  // // );

  // const { isFinish, id } = router.query;
  // const FeedbackId = Number(id);

  // const [loading, setLoading] = useState(true); // loading 상태 추가

  // const closeModal = useCallback(() => {
  //   setOpenModal(false);
  // }, []);

  // useEffect(() => {
  //   setFeedback(mocFeedback.filter((feedback) => feedback.mentorId === 1));
  //   setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 변경
  //   console.log(feedback);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (isFinish === "true") {
  //     setOpenModal(true);
  //     //TODO: id를 이용해서 reservation 개체를 가져와야함
  //     const ret = mocReservation.find(
  //       (reservation) => reservation.id === FeedbackId
  //     );
  //     if (ret) {
  //       // setReservation(ret);
  //     } else {
  //       setOpenModal(false);
  //     }
  //   }
  // }, [isFinish, FeedbackId]);

  return (
    <>
      <Layout>
        {/* {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full p-10 md:p-26">
            <span className="flex text-4xl font-bold text-neutral-800 dark:text-neutral-200 my-10">
              FeedbackLog.
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {feedback.map((feedback) => (
                <FeedbackCard data={feedback} key={feedback.id} />
              ))}
            </div>
          </div>
        )} */}
        {/* <ReservationPost
          isVisible={openModal}
          onClose={closeModal}
          data={reservation}
        /> */}
      </Layout>
    </>
  );
};

export default Feedback;
