import { CategoriesResponseDto } from "../Categories/CategoriesResponse.dto";
import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

export interface MentorProfilePatchReqDto {
  id?: number;
  isHide?: boolean;
  shortDescription?: string;
  description?: string;
  hashtags?: HashtagResponseDto[];
  categories?: CategoriesResponseDto[];
  socialLink?: string | null;
}
