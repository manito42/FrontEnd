import React from "react";
import ProfileImage from "@/components/Profile/Image";
import ProfileInfo from "@/components/Profile/Info";
import DescriptionComponent from "@/components/Profile/Description";
import { useProfileDetailModal } from "@/hooks/Profile/Component";
import { useRouter } from "next/router";
import CardHashtag from "@/components/Global/CardHashtag";
import { useDispatch, useSelector } from "react-redux";
import { CurrMentorSlice } from "@/RTK/Slices/CurrMentor";
import { RootState } from "@/RTK/store";

interface props {
  UserId: number;
  children?: React.ReactNode;
}

export default function UserProfile({ UserId, children }: props) {
  const { UserData, UserLoading } = useProfileDetailModal(UserId);
  const router = useRouter();
  const dispatch = useDispatch();
  if (typeof window === "undefined") {
    return <div>로딩 중...</div>; // 로딩 표시를 보여주셔도 되고, 아무것도 보여주지 않으셔도 됩니다.
  }
  const handleClick = (name: string) => {
    router.push(`/Search/${name}`);
    dispatch(CurrMentorSlice.actions.closeMentorModal());
  };
  const uid = Number(router.query.userId);
  const loginId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  return (
    <>
      {UserData && !UserLoading && (
        <div className="profile-container">
          <div className="ProfileImageNameConatiner">
            <ProfileImage src={UserData.user.profileImage} />
            <ProfileInfo
              nickname={UserData.user.nickname}
              count={UserData.mentoringCount}
              socialLink={uid === loginId ? UserData.socialLink : undefined}
            />
          </div>
          <div className="short-description-container">
            {UserData.shortDescription.length
              ? UserData.shortDescription
              : "짧은 소개글이 없습니다."}
          </div>
          <div className="profile-tag-wrapper">
            <span className="profile-title mb-2">멘토링 분야</span>
            <div className="profile-tag-list">
              {UserData &&
                UserData.categories.length > 0 &&
                UserData.categories.map((category, idx) => (
                  <CardHashtag
                    name={category.name}
                    key={idx}
                    onClick={handleClick}
                    className={"text-sm"}
                  />
                ))}
            </div>
          </div>
          <div className="profile-tag-wrapper">
            <span className="profile-title mb-2">관심분야</span>
            <div className="profile-tag-list">
              {UserData &&
                UserData.hashtags.length > 0 &&
                UserData.hashtags.map((hashtag, idx) => (
                  <CardHashtag
                    name={hashtag.name}
                    key={idx}
                    sharp={true}
                    onClick={handleClick}
                    className={"text-sm"}
                  />
                ))}
            </div>
          </div>
          <div className="profile-description-wrapper">
            <div className="profile-title mb-5">소개글</div>
            <DescriptionComponent description={UserData.description} />
          </div>
          {children}
        </div>
      )}
    </>
  );
}
