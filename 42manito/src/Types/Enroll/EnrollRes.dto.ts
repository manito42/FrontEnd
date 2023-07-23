import { ReservationDefaultDto } from "../Reservations/ReservationDefault.dto";

export interface EnrollResDto {
  menteeReservations: ReservationDefaultDto[];
  mentorReservations: ReservationDefaultDto[];
}
