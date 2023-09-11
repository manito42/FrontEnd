import { ReservationDefaultDto } from "../Reservations/ReservationDefault.dto";

export interface UserReservationResDto {
  menteeReservations: ReservationDefaultDto[];
  mentorReservations: ReservationDefaultDto[];
}
