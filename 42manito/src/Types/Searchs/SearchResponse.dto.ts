export interface SearchResponseDto {
  nickname: string;
  profileImage: string;
  mentorProfile: {
    id: number;
    shortDescription: string;
    description: string;
    isHide: boolean;
    mentoringCount: number;
    createdAt: string;
    updatedAt: string;
    hashtags: {
      id: number;
      name: string;
    }[];
    categories: {
      id: number;
      name: string;
    }[];
  };
}
