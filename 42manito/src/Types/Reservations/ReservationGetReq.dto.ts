import { ReservationStatus } from "@/Types/Reservations/ReservationStatus";
import { ReservationRole } from "@/Types/Reservations/ReservationRole";

export interface IReservationGetReqQuery {
  take?: number;
  page?: number;
  role?: ReservationRole;
  status?: ReservationStatus[];
}

export class ReservationGetReqDto {
  id: number = 0;
  query?: IReservationGetReqQuery = {
    take: 20,
    page: 0,
    role: ReservationRole.ALL,
    status: [
      ReservationStatus.REQUEST,
      ReservationStatus.ACCEPT,
      ReservationStatus.MENTEE_CHECKED,
      ReservationStatus.MENTEE_FEEDBACK,
      ReservationStatus.DONE,
      ReservationStatus.CANCEL,
    ],
  };
}
