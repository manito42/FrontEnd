import { HashtagResponseDto } from "@/Types/Hashtags/HashtagResponse.dto";
import { IPaginationResponse } from "@/Types/General/IPaginationResponse";

export interface MenteeFeedbackGetResDto
  extends IPaginationResponse<HashtagResponseDto> {}
