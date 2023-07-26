import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useGetMentorsMutation } from "@/RTK/Apis/Home";
import { setAllMentor } from "@/RTK/Slices/Home";

export const useFetchHome = () => {
  const allMentor = useSelector(
    (state: RootState) => state.rootReducers.home.allMentor
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [getMentors, { data, isLoading, error }] = useGetMentorsMutation();

  const fetchMoreData = () => {
    getMentors({ take: 12, page: page });
    setPage(page + 1);
  };

  useEffect(() => {
    if (data && !error) {
      dispatch(setAllMentor(data));
      if (data.length % 12 !== 0 || data.length === 0) {
        setHasMore(false);
      }
    }
  }, [isLoading]);

  return { allMentor, fetchMoreData, hasMore };
};
