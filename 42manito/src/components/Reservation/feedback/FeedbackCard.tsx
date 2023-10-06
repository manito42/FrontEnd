import { MenteeFeedbacksResDto } from "@/Types/MenteeFeedbacks/MenteeFeedbacksRes.dto";
import { useGetUserQuery } from "@/RTK/Apis/User";
import Rating from "@mui/material/Rating";
import Image from "next/image";

interface props {
  menteeFeedback: MenteeFeedbacksResDto;
}
export default function FeedbackCard({ menteeFeedback }: props) {
  const { data: mentee } = useGetUserQuery({ id: menteeFeedback.menteeId });

  if (!mentee) return <></>;
  const dateString = new Date(menteeFeedback.createdAt).toLocaleDateString();
  return (
    <>
      <div className="feedback-wrapper">
        <div className="feedback-header">
          <Image
            src={mentee.profileImage}
            alt={mentee.nickname}
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
