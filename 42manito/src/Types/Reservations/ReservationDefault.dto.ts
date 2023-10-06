import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";
import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { CategoriesResponseDto } from "@/Types/Categories/CategoriesResponse.dto";
import { MenteeFeedbacksResDto } from "@/Types/MenteeFeedbacks/MenteeFeedbacksRes.dto";

export interface ReservationDefaultDto {
  id: number;
  mentorId: number;
  menteeId: number;
  category: CategoriesResponseDto;
  requestMessage: string;
  status: ReservationStatus;
  mentorFeedback: MenteeFeedbacksResDto | null;
  menteeFeedback: MenteeFeedbacksResDto | null;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagResponseDto[];
}
