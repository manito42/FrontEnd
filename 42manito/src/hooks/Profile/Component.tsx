import { useGetUserQuery } from "@/RTK/Apis/User";

export const useProfileDetailModal = (userId: number) => {
  const { data: OwnerData, isLoading: OwnerLoading } = useGetUserQuery(
    { id: userId },
    { skip: userId === 0 },
  );

  return { UserData: OwnerData, UserLoading: OwnerLoading };
};
