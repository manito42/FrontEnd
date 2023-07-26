import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { useRouter } from "next/router";
import { useGetUserQuery } from "@/RTK/Apis/User";

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

  if (ownerId !== Number(userId)) {
    router.push("/NotFound");
  }

  return { OwnerData, OwnerLoading };
};
