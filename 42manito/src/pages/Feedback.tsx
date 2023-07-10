import { MentorFeedbackResDto } from "@/Types/MentorFeedbackDto";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { mocFeedback } from "../../mocData/mocFeedback";

const Feedback = () => {
  const [feedback, setFeedback] = useState<MentorFeedbackResDto[]>(
    [] as MentorFeedbackResDto[]
  );

  const [loading, setLoading] = useState(true); // loading 상태 추가

  useEffect(() => {
    setFeedback(mocFeedback.filter((feedback) => feedback.mentorId === 1));
    setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 변경
    console.log(feedback);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        {loading ? (
          <p>Loading...</p>
        ) : (
          /* TODO: 추후에 무한스크롤로 구현해야함 */
          <div className="w-full p-10 md:p-26">
            <span>FeedbackLog.</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {feedback.map((feedback) => (
                <FeedbackCard data={feedback} key={feedback.id} />
              ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Feedback;
