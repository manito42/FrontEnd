import { CategoriesResponseDto } from "../Categories/CategoriesResponse.dto";
import { HashtagResponseDto } from "../Hashtags/HashtagResponse.dto";

export interface UserDefaultDto {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  isMentor: boolean;
  role: string; // default: 'USER'
  createdAt: string;
  updatedAt: string;
  mentorProfile: {
    id: number;
    shortDescription: string;
    description: string;
    isHide: boolean;
    mentoringCount: number;
    createdAt: string;
    updatedAt: string;
    hashtags: HashtagResponseDto[];
    categories: CategoriesResponseDto[];
  };
}
