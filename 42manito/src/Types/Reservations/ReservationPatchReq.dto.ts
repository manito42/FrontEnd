import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

export interface ReservationPatchReqDto {
  requestStatus: string;
  status: string;
  categoryId: number;
  hashtags: HashtagResponseDto[];
}
