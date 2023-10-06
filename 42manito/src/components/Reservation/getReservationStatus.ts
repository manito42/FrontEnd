// ROLE: 카드 내 대상의 ROLE 을 뜻함.

export const enum ReservationUserRole {
  mentor = "mentor",
  mentee = "mentee",
}

export function getStatus(role: ReservationUserRole, status: string) {
  if (role === ReservationUserRole.mentee) {
    switch (status) {
      case "REQUEST":
        return "요청";
      case "ACCEPT":
        return "확인중";
      case "MENTEE_CHECKED":
        return "진행중";
      case "MENTEE_FEEDBACK":
        return "리뷰 대기";
      case "DONE":
        return "완료";
      case "CANCEL":
        return "취소";
    }
  } else {
    switch (status) {
      case "REQUEST":
        return "수락 대기";
      case "ACCEPT":
        return "수락";
      case "MENTEE_CHECKED":
        return "진행중";
      case "MENTEE_FEEDBACK":
        return "리뷰 대기";
      case "DONE":
        return "완료";
      case "CANCEL":
        return "취소";
    }
  }
  return `{role} ${status}`;
}
