export interface UserReservationReqDto {
  id: number; // Uid
  take?: number;
  page?: number;
  as_mentor?: boolean;
  as_mentee?: boolean;
  active?: boolean; // default: false
}
