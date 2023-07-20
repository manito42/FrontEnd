import { CategoriesResponseDto } from "../Categories/CategoriesResponse.dto";
import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

export interface MentorProfileDto {
  id: number;
  shortDescription: string;
  description: string;
  isHide: boolean;
  mentoringCount: number;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagResponseDto[];
  categories: CategoriesResponseDto[];
  user: {
    id: number;
    nickname: string;
    profileImage: string;
  };
}
