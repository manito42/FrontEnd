import { CategoryDto } from "./CategoryDto";
import { HashtagDto } from "./HashtagDto";

interface mentorUser {
  id: number;
  nickname: string;
  profileImage: string;
  // rate: number; 추후에 업데이트가 된다면?
}

export interface mentorResDto {
  id: number;
  shortDescription: string;
  description: string;
  isHide: boolean;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagDto[];
  categories: CategoryDto[];
  user: mentorUser;
}
