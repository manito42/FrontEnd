import React, { useEffect } from "react";
import { useGetMentorsQuery } from "@/RTK/Apis/Home";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";

export const useFetchHome = (categoryId?: number | undefined) => {
  const [page, setPage] = React.useState<number>(0);
  const [newMentor, setNewMentor] = React.useState<
    MentorProfileDto[] | undefined
  >(undefined);

  const {
    data: mentors,
    isLoading,
    error,
  } = useGetMentorsQuery({
    category_id: categoryId,
    page,
    take: 12,
  });

  const fetchNewCategory = () => {
    setPage(0);
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (mentors && !error && !isLoading) {
      setNewMentor(mentors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, mentors]);

  return { newMentor, fetchNewCategory, fetchMoreData };
};
