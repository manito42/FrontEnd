import dynamic from "next/dynamic";
import ManitoToggle from "@/components/Profile/Toggle";
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";

const UserProfile = dynamic(() => import("@/components/Profile/UserProfile"), {
  ssr: false,
});

const Profile = () => {
  const route = useRouter();
  const uid = Number(route.query.userId);
  const updateButtonHandler = () => {
    if (uid) {
      route.push(`/ProfileUpdate/${uid}`);
    }
  };
  return !uid ? (
    <Layout>
      <div className="ProfileWrapper"></div>
    </Layout>
  ) : (
    <Layout>
      <div className="ProfileWrapper">
        <UserProfile
          UserId={Number(uid)}
          additions={
            <div className="flex flex-col justify-between items-center mb-10">
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
          }
        />
      </div>
    </Layout>
  );
};

export default Profile;
