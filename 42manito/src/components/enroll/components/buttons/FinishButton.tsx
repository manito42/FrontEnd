import { ReservationPostDto } from "@/Types/Reservations/ReservationPost.dto";
import FeedbackPost from "@/components/feedback/FeedbackPost";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

interface FinishButtonProps {
  data: ReservationPostDto;
  isVisible: boolean;
}

const FinishButton = ({ data, isVisible }: FinishButtonProps) => {
  if (!isVisible) return null;

  return (
    <div className="mt-4">
      {/* <Link href={`/Feedback?isFinish=${true}&id=${data}`}> */}
      <button
        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        완료
      </button>
      {/* </Link> */}
    </div>
  );
};

export default FinishButton;
