import { MentorProfileDto } from "@/Types/MentorProfileDto";
import React from "react";

interface props {
  data: MentorProfileDto;
}

const MentorCard = ({ data }: props) => {
  return <div className="mentor-card"></div>;
};

export default MentorCard;
