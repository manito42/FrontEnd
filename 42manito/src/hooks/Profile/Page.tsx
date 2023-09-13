import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/RTK/store";
import { useRouter } from "next/router";
import { useGetUserQuery } from "@/RTK/Apis/User";
import { useEffect } from "react";

export const useProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useAppDispatch();

  const ownerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const { data: OwnerData, isLoading: OwnerLoading } = useGetUserQuery(
    { id: ownerId },
    { skip: ownerId === 0 },
  );

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser && ownerId !== 0 && ownerId !== Number(userId)) {
      router.push("/404");
    }
  }, [ownerId, userId, isBrowser, router, dispatch]);

  return { UserData: OwnerData, UserLoading: OwnerLoading };
};
