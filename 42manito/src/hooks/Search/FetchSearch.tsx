import { useGetSearchMutation } from "@/RTK/Apis/Search";
import { initSearchResult, setSearchResult } from "@/RTK/Slices/Search";
import { RootState, useAppDispatch } from "@/RTK/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchSearch = () => {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [SearchMutation, { data, isLoading }] = useGetSearchMutation();
  const searchMentors = useSelector(
    (state: RootState) => state.rootReducers.search.searchResult,
  );
  const { searchKeyword } = router.query;
  const dispatch = useAppDispatch();

  const fetchMoreData = () => {
    if (searchKeyword && typeof searchKeyword === "string") {
      // trim first # from searchKeyword
      let keyword = searchKeyword;
      if (keyword[0] === "#" && keyword.length > 1) {
        keyword = keyword.slice(1);
        SearchMutation({
          search_string: keyword,
          take: 12,
          page: page,
          search_by_hashtag_name: true,
          search_by_user_nickname: false,
        });
      } else {
        SearchMutation({
          search_string: keyword,
          take: 12,
          page: page,
        });
      }
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setSearchResult(data));
      if (data.length % 12 !== 0 || data.length === 0) {
        setHasMore(false);
      }
    }
  }, [data, dispatch, isLoading]);

  useEffect(() => {
    setPage(0);

    return () => {
      setPage(0);
      setHasMore(true);
      dispatch(initSearchResult());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  useEffect(() => {
    if (page === 0) fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { searchMentors, hasMore, fetchMoreData };
};
