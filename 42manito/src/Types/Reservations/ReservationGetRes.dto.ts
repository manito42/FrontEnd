import { ReservationDefaultDto } from "./ReservationDefault.dto";

export interface ReservationGetResDto {
  mentorReservation: ReservationDefaultDto[];
  menteeReservation: ReservationDefaultDto[];
}
