import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useRouter } from "next/router";
import { useGetUserQuery } from "@/RTK/Apis/User";
import { useEffect } from "react";

export const useProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const ownerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const { data: OwnerData, isLoading: OwnerLoading } = useGetUserQuery(
    { id: ownerId },
    { skip: ownerId === 0 }
  );

  useEffect(() => {
    if (ownerId !== Number(userId)) {
      router.push("/404");
    }
  }, [ownerId, userId, router]);

  return { OwnerData, OwnerLoading };
};
