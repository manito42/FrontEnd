export interface FeedbackGetDto {
  id: number;
  mentorId: number;
  menteeId: number;
  reservationId: number;
  rating: number;
  content?: string;
  createAt: string;
  updateAt: string;
}
