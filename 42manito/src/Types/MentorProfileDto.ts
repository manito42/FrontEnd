import { CategoryDto } from "./CategoryDto";
import { HashtagDto } from "./HashtagDto";

export interface MentorProfileDto {
  id: number;
  nickname: string;
  shortDescription: string;
  description: string;
  role: string;
  profileImage: string;
  isHide: boolean;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagDto[];
  categories: CategoryDto[];
}
