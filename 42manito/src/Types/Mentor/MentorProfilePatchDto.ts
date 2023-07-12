import { HashtagDto } from "../Hashtag/HashtagDto";

export interface MentorProfilePatchDto {
  isHide: boolean;
  shortDescription: string;
  description: string;
  hashtag: HashtagDto[];
}
