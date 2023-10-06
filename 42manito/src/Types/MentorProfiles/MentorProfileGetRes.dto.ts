import { MentorProfileDto } from "./MentorProfile.dto";
import { IPaginationResponse } from "@/Types/General/IPaginationResponse";

export interface MentorProfileGetResDto
  extends IPaginationResponse<MentorProfileDto> {}
