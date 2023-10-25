import { MenteeFeedbacksResDto } from "@/Types/MenteeFeedbacks/MenteeFeedbacksRes.dto";
import { useGetUserQuery } from "@/RTK/Apis/User";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { Img } from "@storybook/components";

interface props {
  menteeFeedback: MenteeFeedbacksResDto;
}
export default function FeedbackCard({ menteeFeedback }: props) {
  const { data: mentee, isLoading } = useGetUserQuery({
    id: menteeFeedback.menteeId,
  });
  const [image, setImage] = useState(mentee?.profileImage);
  useEffect(() => {
    if (isLoading) return;
    setImage(mentee?.profileImage);
  }, [mentee, isLoading]);

  if (!mentee) return <></>;
  const dateString = new Date(menteeFeedback.createdAt).toLocaleDateString();
  return (
    <>
      <div className="feedback-wrapper">
        <div className="feedback-header">
          <Img
            src={image}
            alt={mentee.nickname}
            onError={() => setImage("/default_profile.png")}
            className={"feedback-profile-img mt-1"}
            width={60}
            height={60}
          />
          <div className={"feedback-info"}>
            <div className={"feedback-mentee-name"}>{mentee.nickname}</div>
            <div className={"feedback-date"}>{dateString}</div>
            <Rating value={menteeFeedback.rating} size={"small"} readOnly />
          </div>
        </div>
        <div className="feedback-content">{menteeFeedback.content}</div>
      </div>
    </>
  );
}
