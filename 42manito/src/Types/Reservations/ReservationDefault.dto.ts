import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";

export interface ReservationDefaultDto {
  id: number;
  mentorId: number;
  menteeId: number;
  categoryId: number;
  requestMessage: string;
  status: ReservationStatus;
  mentorFeedback: {
    id: number;
    menteeId: number;
    mentorId: number;
    reservationId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  menteeFeedback: {
    id: number;
    menteeId: number;
    mentorId: number;
    reservationId: number;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagResponseDto[];
}
