import { useGetUserQuery, useSetIsHideMutation } from "@/RTK/Apis/User";
import { RootState } from "@/RTK/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ManitoToggle() {
  const [isHide, setIsHide] = useState(false);
  const [setIsHideMutation, {}] = useSetIsHideMutation();
  const userId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const { data: userData, isLoading: userLoading } = useGetUserQuery(
    { id: userId as number },
    { skip: userId === undefined }
  );

  const changeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) {
      setIsHideMutation({ id: userId as number, isHide: true });
    } else {
      if (userData) {
        const { categories, hashtags, socialLink } = userData.mentorProfile;
        if (categories.length == 0)
          alert("멘토링 분야를 최소한 하나 이상 설정해야 합니다.");
        else if (hashtags.length == 0)
          alert("관심 분야를 최소한 하나 이상 설정해야 합니다.");
        else if (socialLink == "") alert("슬랙 프로필 링크를 추가해야 합니다.");
        else
          setIsHideMutation({
            id: userId as number,
            isHide: false,
            socialLink: socialLink,
          });
      }
    }
  };

  useEffect(() => {
    if (userData !== undefined && userLoading === false) {
      setIsHide(userData.mentorProfile.isHide);
    }
  }, [userData, userLoading]);

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
