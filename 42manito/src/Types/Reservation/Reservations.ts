import { HashtagDto } from "../Hashtag/HashtagDto";

export interface ReservationGetDto {
  id: number;
  mentorId: number;
  menteeId: number;
  categoryId: number;
  requestMessage: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagDto[];
}
