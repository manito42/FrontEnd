export interface MentorFeedbackResDto {
  id: number;
  menteeId: number;
  mentorId: number;
  reservationId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MentorFeedbackPostDto {
  menteeId: number;
  mentorId: number;
  reservationId: number;
  rating: number;
  content: string;
}
