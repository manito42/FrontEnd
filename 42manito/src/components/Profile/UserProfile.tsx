import Enroll from "@/components/Enroll";
import Layout from "@/components/Layout/Layout";
import React from "react";
import ProfileUpdate from "@/components/Profile/Update/Update";
import ProfileImage from "@/components/Profile/Image";
import ProfileInfo from "@/components/Profile/Info";
import ProfileCategories from "@/components/Profile/Categories";
import ProfileHashtag from "@/components/Profile/Hashtag";
import { useProfileUpdateModal } from "@/hooks/Profile/UpdateModal";
import { useProfilePage } from "@/hooks/Profile/Page";
import { useRouter } from "next/router";

export default function UserProfile() {
  const { OwnerData, OwnerLoading } = useProfilePage();
  const route = useRouter();

  const updateButtonHandler = () => {
    if (OwnerData) {
      route.push(`profileUpdate/${OwnerData.id}`);
    }
  };

  if (typeof window === "undefined") {
    return <div>로딩 중...</div>; // 로딩 표시를 보여주셔도 되고, 아무것도 보여주지 않으셔도 됩니다.
  }
  return (
    <Layout>
      {OwnerData && !OwnerLoading && (
        <div className="app-container pt-32">
          {OwnerData.isMentor ? (
            <div className="mt-12 w-[100vw] flex flex-col">
              <div className="w-[20%] absolute md:w-[8%] right-10">
                <button
                  className="text-xs md:text-[1vw] md:h-[3vw] bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow w-full px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => updateButtonHandler()}
                >
                  수정하기
                </button>
              </div>
              <div className="flex flex-wrap w-full items-center justify-center">
                <ProfileImage src={OwnerData.profileImage} />
                <ProfileInfo
                  nickname={OwnerData.nickname}
                  description={OwnerData.mentorProfile.description}
                  count={OwnerData.mentorProfile.mentoringCount}
                />
              </div>
              <div className="flex flex-wrap justify-center w-full my-3 mt-14">
                <ProfileCategories
                  categories={OwnerData.mentorProfile.categories}
                />

                <ProfileHashtag hashtag={OwnerData.mentorProfile.hashtags} />
              </div>

              <Enroll viewProfileTypo={OwnerData.isMentor} />
            </div>
          ) : (
            <div className="app-container">
              <Enroll viewProfileTypo={OwnerData?.isMentor} />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
