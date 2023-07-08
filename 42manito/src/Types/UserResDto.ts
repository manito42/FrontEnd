import { CategoryDto } from "./CategoryDto";
import { HashtagDto } from "./HashtagDto";

interface MentorProfileDto {
  id: number;
  nickname: string;
  shortDescription: string;
  description: string;
  isHide: boolean;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagDto[];
  categories: CategoryDto[];
}

export interface UserResDto {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  isMentor: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  mentorProfile: MentorProfileDto;
}
