import { MentorProfileDto } from "./MentorProfileDto";

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
