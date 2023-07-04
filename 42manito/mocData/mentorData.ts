import { MentorProfileDto } from "@/Types/MentorProfileDto";

export const mockMentorProfiles: MentorProfileDto[] = [
  {
    id: 1,
    shortDescription: "Experienced software engineer",
    description:
      "I have 10 years of experience in software engineering and have worked with various technologies.",
    image: "https://example.com/image1.jpg",
    isHide: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    hashtags: [
      { id: 1, name: "software" },
      { id: 2, name: "engineering" },
    ],
    categories: [{ id: 1, name: "Technology" }],
  },
  {
    id: 2,
    shortDescription: "Data scientist and AI researcher",
    description:
      "My expertise lies in data science and artificial intelligence research.",
    image: "https://example.com/image2.jpg",
    isHide: false,
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-02-01T00:00:00.000Z",
    hashtags: [
      { id: 3, name: "data" },
      { id: 4, name: "AI" },
    ],
    categories: [{ id: 2, name: "Data Science" }],
  },
  {
    id: 3,
    shortDescription: "Mock Mentor 3",
    description: "Description of mock mentor 3",
    image: "https://example.com/image3.jpg",
    isHide: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    hashtags: [
      { id: 1, name: "hashtag1" },
      { id: 2, name: "hashtag2" },
    ],
    categories: [{ id: 3, name: "Category 1" }],
  },
  {
    id: 4,
    shortDescription: "Mock Mentor 3",
    description: "Description of mock mentor 3",
    image: "https://example.com/image4.jpg",
    isHide: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    hashtags: [
      { id: 1, name: "hashtag1" },
      { id: 2, name: "hashtag2" },
    ],
    categories: [{ id: 3, name: "Category 1" }],
  },
  // 나머지 27개의 mock 데이터 추가
  {
    id: 30,
    shortDescription: "Mock Mentor 30",
    description: "Description of mock mentor 30",
    image: "https://example.com/image30.jpg",
    isHide: false,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    hashtags: [
      { id: 14, name: "hashtag14" },
      { id: 15, name: "hashtag15" },
    ],
    categories: [{ id: 30, name: "Category 28" }],
  },
];

console.log(mockMentorProfiles);
