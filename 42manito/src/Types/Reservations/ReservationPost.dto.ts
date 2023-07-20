import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

export interface ReservationPostDto {
  mentorId: number;
  menteeId: number;
  categoryId: number;
  requestMessage: string;
  hashtags: HashtagResponseDto[];
}
