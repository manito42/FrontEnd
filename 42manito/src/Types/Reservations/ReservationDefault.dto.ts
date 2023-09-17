import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";

export interface ReservationDefaultDto {
  id: number;
  mentorId: number;
  menteeId: number;
  category: CategoriesResponseDto;
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
  } | null;
  menteeFeedback: {
    id: number;
    menteeId: number;
    mentorId: number;
    reservationId: number;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagResponseDto[];
}
