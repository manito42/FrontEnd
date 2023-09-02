import Layout from "@/components/Layout/Layout";
import React from "react";
import ProfileImage from "@/components/Profile/Image";
import ProfileInfo from "@/components/Profile/Info";
import ProfileCategories from "@/components/Profile/Categories";
import ProfileHashtag from "@/components/Profile/Hashtag";
import { useProfilePage } from "@/hooks/Profile/Page";
import { useRouter } from "next/router";
import ManitoToggle from "./Toggle";
import DescriptionComponent from "@/components/Profile/Description";

export default function UserProfile() {
  const { OwnerData, OwnerLoading } = useProfilePage();
  const route = useRouter();

  const updateButtonHandler = () => {
    if (OwnerData) {
      route.push(`/ProfileUpdate/${OwnerData.id}`);
    }
  };

  if (typeof window === "undefined") {
    return <div>로딩 중...</div>; // 로딩 표시를 보여주셔도 되고, 아무것도 보여주지 않으셔도 됩니다.
  }
  return (
    <Layout>
      {OwnerData && !OwnerLoading && (
        <div className="app-container pt-32">
          <div
            className="flex flex-wrap flex-col items-center justify-center mt-5 mb-12
            w-[80vw] rounded-2xl bg-gray-100 dark:bg-gray-900
            drop-shadow-2xl"
          >
            <div className="md:flex flex-wrap w-full items-center justify-center mt-12">
              <ProfileImage src={OwnerData.profileImage} />
              <ProfileInfo
                nickname={OwnerData.nickname}
                count={OwnerData.mentorProfile.mentoringCount}
              />
            </div>
            <div
              className="flex flex-wrap justify-center
                w-[80%] break-all px-3 py-4
                mt-10 mb-14
                rounded-2xl bg-gray-100 dark:bg-gray-800
                shadow-sm"
            >
              {OwnerData.mentorProfile.shortDescription ??
                "짧은 소개글이 없습니다."}
            </div>
            <ProfileCategories
              categories={OwnerData.mentorProfile.categories}
            />
            <ProfileHashtag hashtag={OwnerData.mentorProfile.hashtags} />
            <div className="flex flex-wrap flex-col items-center justify-center w-[80%] mb-10">
              <div className="text-3xl font-bold">소개글</div>
              <div className="h-[1px] bg-slate-800 dark:bg-slate-50 w-[40vw] my-8" />
              <DescriptionComponent
                description={OwnerData.mentorProfile.description}
              />
            </div>
            <div className="flex flex-col justify-between item- mb-10">
              <div className="m-3">
                <ManitoToggle />
              </div>
              <button
                className="text-xs md:text-[1vw] md:h-[3vw] bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow w-full px-4 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-2 ease-linear transition-all duration-150"
                type="button"
                onClick={() => updateButtonHandler()}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
