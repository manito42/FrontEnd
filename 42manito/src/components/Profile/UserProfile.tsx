import React from "react";
import ProfileImage from "@/components/Profile/Image";
import ProfileInfo from "@/components/Profile/Info";
import ProfileCategories from "@/components/Profile/Categories";
import ProfileHashtag from "@/components/Profile/Hashtag";
import DescriptionComponent from "@/components/Profile/Description";
import { useProfileDetailModal } from "@/hooks/Profile/Component";

interface props {
  UserId: number;
  children?: React.ReactNode;
}

export default function UserProfile({ UserId, children }: props) {
  const { UserData, UserLoading } = useProfileDetailModal(UserId);
  if (typeof window === "undefined") {
    return <div>로딩 중...</div>; // 로딩 표시를 보여주셔도 되고, 아무것도 보여주지 않으셔도 됩니다.
  }

  return (
    <>
      {UserData && !UserLoading && (
        <div className="ProfileContainer">
          <div className="ProfileImageNameConatiner">
            <ProfileImage src={UserData.user.profileImage} />
            <ProfileInfo
              nickname={UserData.user.nickname}
              count={UserData.mentoringCount}
            />
          </div>
          <div className="ShortDescriptionContainer">
            {UserData.shortDescription ?? "짧은 소개글이 없습니다."}
          </div>
          <div className="ProfileTagWrapper">
            <span className="ProfileHeader">멘토링 분야</span>
            <ProfileCategories categories={UserData.categories} />
          </div>
          <div className="ProfileTagWrapper">
            <span className="ProfileHeader">관심분야</span>
            <ProfileHashtag hashtag={UserData.hashtags} />
          </div>
          <div className="ProfileDescriptionWrapper">
            <div className="ProfileHeader mb-5">소개글</div>
            <DescriptionComponent description={UserData.description} />
          </div>
          {children}
        </div>
      )}
    </>
  );
}
