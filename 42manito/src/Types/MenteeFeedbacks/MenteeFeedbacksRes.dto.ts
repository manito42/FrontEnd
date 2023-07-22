export interface MenteeFeedbacksResDto {
  id: number;
  menteeId: number;
  mentorId: number;
  reservationId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
