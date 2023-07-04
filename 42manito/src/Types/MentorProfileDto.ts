import { CategoryDto } from "./CategoryDto";
import { HashtagDto } from "./HashtagDto";

export interface MentorProfileDto {
  id: number;
  shortDescription: string;
  description: string;
  image: string;
  isHide: boolean;
  createdAt: string;
  updatedAt: string;
  hashtags: HashtagDto[];
  categories: CategoryDto[];
}
