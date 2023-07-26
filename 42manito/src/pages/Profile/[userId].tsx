import Enroll from "@/components/Enroll";
import Layout from "@/components/Layout/Layout";
import React from "react";
import ProfileUpdate from "@/components/Profile/Update";
import ProfileImage from "@/components/Profile/Image";
import ProfileInfo from "@/components/Profile/Info";
import ProfileCategories from "@/components/Profile/Categories";
import ProfileHashtag from "@/components/Profile/Hashtag";
import { useProfileUpdateModal } from "@/hooks/Profile/UpdateModal";
import { useProfilePage } from "@/hooks/Profile/Page";

const Profile = () => {
  const { isProfileUpdateOpen, openProfileUpdate, closeProfileUpdate } =
    useProfileUpdateModal();
  const { OwnerData, OwnerLoading } = useProfilePage();

  return (
    <Layout>
      {OwnerData && !OwnerLoading && (
        <div className="app-container pt-32 min-h-screen">
          {OwnerData.isMentor ? (
            <div className="">
              <div className="w-full flex justify-end ">
                <button
                  className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => openProfileUpdate()}
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
              <div className="grid grid-rows-2">
                <div className="grid gird-rows-2 lg:grid-cols-2 justify-center w-full my-3 md:my-28 max-h-[40vh]">
                  <ProfileCategories
                    categories={OwnerData.mentorProfile.categories}
                  />
                  <ProfileHashtag hashtag={OwnerData.mentorProfile.hashtags} />
                </div>
                <Enroll viewProfileTypo={OwnerData.isMentor} />
              </div>
            </div>
          ) : (
            <div className="app-container">
              <Enroll viewProfileTypo={OwnerData?.isMentor} />
            </div>
          )}
        </div>
      )}
      {isProfileUpdateOpen && OwnerData && (
        <ProfileUpdate onClose={closeProfileUpdate} data={OwnerData} />
      )}
    </Layout>
  );
};

export default Profile;
