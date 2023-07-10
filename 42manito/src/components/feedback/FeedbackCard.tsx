import { MentorFeedbackResDto } from "@/Types/MentorFeedbackDto";
import { UserResDto } from "@/Types/UserResDto";
import React, { useEffect, useState } from "react";
import { mockMentorProfiles } from "../../../mocData/mentorData";
import { mentorResDto } from "@/Types/MentorProfileDto";
import Image from "next/image";

interface props {
  data: MentorFeedbackResDto;
}

const FeedbackCard = ({ data }: props) => {
  const [currUser, setCurrUser] = useState<mentorResDto>({} as mentorResDto);
  const [loading, setLoading] = useState(true); // loading 상태 추가
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const curr = mockMentorProfiles.find(
      (mentor) => mentor.user.id === data.menteeId
    );
    if (curr) {
      setCurrUser(curr);
      setDate(
        new Date(data.createdAt).getFullYear() +
          "년 " +
          (new Date(data.createdAt).getMonth() + 1) +
          "월 " +
          new Date(data.createdAt).getDate() +
          "일"
      );
      setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 변경
    }
  }, [data]);

  return (
    <div className="feedback-card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full flex flex-row justify-center items-center min-w-[200px] min-h-[200px]">
          <Image
            alt="FeedbackImage"
            src={currUser.user.profileImage}
            width={150}
            height={150}
            quality={100}
            style={{ borderRadius: "50%" }}
          />
          <div className="ml-5">
            <span className="w-full flex justify-start text-3xl font-bold">
              {currUser.user.nickname}
            </span>
            <span className="w-full mt-3 flex justify-center text-xl font-bold">
              {data.menteeId}
            </span>
            <span className="w-full mt-3 flex justify-end text-gray-600 dark:text-gray-400">
              {date}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
