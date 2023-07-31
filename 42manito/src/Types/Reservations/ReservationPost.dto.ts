import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

interface hashtagTest {
  id: number;
}

export interface ReservationPostDto {
  mentorId: number;
  menteeId: number;
  categoryId: number;
  requestMessage: string;
  // hashtags: HashtagResponseDto[];
  hashtags: hashtagTest[];
}
