import { ReservationDefaultDto } from "./ReservationDefault.dto";
import { IPaginationResponse } from "@/Types/General/IPaginationResponse";

export interface ReservationGetResDto
  extends IPaginationResponse<ReservationDefaultDto> {}
