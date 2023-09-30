import dynamic from "next/dynamic";
import ManitoToggle from "@/components/Profile/Toggle";
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";
import { Button } from "@/common";
import { ButtonType } from "@/Types/General/ButtonType";

const UserProfile = dynamic(() => import("@/components/Profile/UserProfile"), {
  ssr: false,
});

const Profile = () => {
  const route = useRouter();
  const uid = Number(route.query.userId);
  const loginId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
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
        <UserProfile UserId={Number(uid)}>
          {uid === loginId && (
            <div className="flex flex-col justify-between items-center mb-10">
              <div className="m-3">
                <ManitoToggle />
              </div>
              <Button
                buttonType={ButtonType.ACCEPT}
                onClick={() => updateButtonHandler()}
              >
                수정하기
              </Button>
            </div>
          )}
        </UserProfile>
      </div>
    </Layout>
  );
};

export default Profile;
