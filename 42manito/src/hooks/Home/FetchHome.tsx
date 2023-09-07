import React, { useEffect } from "react";
import { useGetMentorsMutation } from "@/RTK/Apis/Home";
import { MentorProfileDto } from "@/Types/MentorProfiles/MentorProfile.dto";

export const useFetchHome = (categoryId?: number | undefined) => {
  const [newMentor, setNewMentor] = React.useState<
    MentorProfileDto[] | undefined
  >(undefined);
  const [getMentors, { data: mentors, isLoading, error }] =
    useGetMentorsMutation();
  const [page, setPage] = React.useState<number>(0);

  const fetchNewCategory = () => {
    getMentors({ take: 12, page: 0, category_id: categoryId });
    setPage(0);
  };

  const fetchMoreData = () => {
    getMentors({ take: 12, page: page + 1, category_id: categoryId });
    setPage(page + 1);
  };

  useEffect(() => {
    if (mentors && !error && !isLoading) {
      setNewMentor(mentors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { newMentor, fetchNewCategory, fetchMoreData };
};
