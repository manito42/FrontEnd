export interface UserReservationGetDto {
  id: number;
  take: number;
  page: number;
  as_mentor: boolean;
  as_mentee: boolean;
  active: boolean;
}
