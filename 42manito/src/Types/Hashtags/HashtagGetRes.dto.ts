import { HashtagResponseDto } from "./HashtagResponse.dto";
import { IPaginationResponse } from "@/Types/General/IPaginationResponse";

export interface HashtagGetResDto
  extends IPaginationResponse<HashtagResponseDto> {}
