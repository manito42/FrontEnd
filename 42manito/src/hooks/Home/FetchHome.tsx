import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetMentorsMutation } from "@/RTK/Apis/Home";
import { setAllMentor } from "@/RTK/Slices/Home";

export const useFetchHome = (categoryId?: number | undefined) => {
  const allMentor = useSelector(
    (state: RootState) => state.rootReducers.home.allMentor,
  );
  const dispatch = useDispatch();
  const [getMentors, { data: mentors, isLoading, error }] =
    useGetMentorsMutation();

  const fetchNewCategory = () => {
    getMentors({ take: 12, page: 0, category_id: categoryId });
  };

  useEffect(() => {
    if (mentors && !error) {
      dispatch(setAllMentor(mentors));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { allMentor, fetchNewCategory };
};
