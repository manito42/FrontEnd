import { useGetUserQuery, useSetIsHideMutation } from "@/RTK/Apis/User";
import { RootState } from "@/RTK/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ManitoToggle() {
  const [isHide, setIsHide] = useState(false);
  const [setIsHideMutation, {}] = useSetIsHideMutation();
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const { data: userDate, isLoading: userLoading } = useGetUserQuery(
    { id: userId as number },
    { skip: userId === undefined },
  );

  const changeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHideMutation({ id: userId as number, isHide: !e.target.checked });
  };

  useEffect(() => {
    if (userDate) {
      setIsHide(userDate.mentorProfile.isHide);
    }
  }, [userId, userDate]);

  useEffect(() => {
    if (userDate !== undefined && userLoading === false) {
      setIsHide(userDate.mentorProfile.isHide);
    }
  }, [userDate, userLoading]);

  return (
    <div className="items-center justify-center flex flex-row mb-5">
      <div className="text-lg font-bold mr-3 mb-0.5">멘토로 활동하기</div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          onChange={changeToggle}
          className="sr-only peer"
          checked={!isHide}
        ></input>
        <div
          className="w-11 h-6 bg-gray-200
          peer-focus:outline-none
          peer-focus:ring-4
          peer-focus:ring-signature_color-300 dark:peer-focus:ring-signature_color-800
          rounded-full
          peer dark:bg-gray-700
          peer-checked:after:translate-x-full
          peer-checked:after:border-white after:content-['']
          after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:border-gray-300
          after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all
          dark:border-gray-600 peer-checked:bg-signature_color-600"
        ></div>
      </label>
    </div>
  );
}
