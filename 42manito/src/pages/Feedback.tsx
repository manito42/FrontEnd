import { MentorFeedbackResDto } from "@/Types/MentorFeedbackDto";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { mocFeedback } from "../../mocData/mocFeedback";

const Feedback = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);

  return (
    <>
      <Layout>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="app-container">
            <div className="flex flex-wrap ">
              {feedback.map((feedback) => (
                <div
                  className="w-full xs:w-1/2 md:w-1/3 mt-5 px-3"
                  key={feedback.id}
                >
                  <FeedbackCard data={feedback} isVisible={isVisible} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Feedback;
