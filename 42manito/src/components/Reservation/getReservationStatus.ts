// ROLE: 카드 내 대상의 ROLE 을 뜻함.

export const enum ReservationRole {
  Mentor = "mentor",
  Mentee = "mentee",
}

export function getStatus(role: ReservationRole, status: string) {
  if (role === ReservationRole.Mentee) {
    switch (status) {
      case "REQUEST":
        return "요청";
      case "ACCEPT":
        return "확인중";
      case "MENTEE_CHECKED":
        return "진행중";
      case "MENTEE_FEEDBACK":
        return "피드백";
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
        return "피드백";
      case "DONE":
        return "완료";
      case "CANCEL":
        return "취소";
    }
  }
  return `{role} ${status}`;
}