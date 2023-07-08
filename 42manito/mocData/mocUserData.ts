import { UserResDto } from "@/Types/UserResDto";

export const mocUser: UserResDto = {
  id: 1,
  email: "leegh4250@gmail.com",
  nickname: "Mock Mentor 1",
  profileImage: "https://i.pravatar.cc/150?img=1",
  isMentor: true,
  role: "USER",
  createdAt: "2021-08-16T14:00:00.000Z",
  updatedAt: "2021-08-16T14:00:00.000Z",
  mentorProfile: {
    id: 1,
    nickname: "Mock Mentor 1",
    shortDescription: "Experienced software engineer",
    description:
      "I have 10 years of experience in software engineering and have worked with various technologies.",
    isHide: true,
    createdAt: "2021-08-16T14:00:00.000Z",
    updatedAt: "2021-08-16T14:00:00.000Z",
    hashtags: [
      { id: 1, name: "software" },
      { id: 2, name: "engineering" },
    ],
    categories: [{ id: 1, name: "DEVELOP" }],
  },
};
