import { PaginationInfoDto } from "@/Types/General/IPaginationInfo";

/**
 * @brief   Interface for pagination response
 * @generic T: Type of content
 */
export interface IPaginationResponse<T> {
  content: T[];
  page: PaginationInfoDto;
}
