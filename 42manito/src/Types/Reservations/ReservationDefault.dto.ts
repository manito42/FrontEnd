import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

export interface ReservationDefaultDto {
  id: number;
  mentorId: number;
  menteeId: number;
  categoryId: number;
  requestMessage: string;
  status: string; // REQUEST, ACCEPT, PENDING, COMPLETE, CANCEL
  metnorFeedback: {
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
