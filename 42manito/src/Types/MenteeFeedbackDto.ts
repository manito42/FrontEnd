export interface MenteeFeedbackPostDto {
  menteeId: number;
  mentorId: number;
  reservationId: number;
  rating: number;
  content: string;
}

export interface MenteeFeedbackResDto {
  id: number;
  menteeId: number;
  mentorId: number;
  reservationId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
