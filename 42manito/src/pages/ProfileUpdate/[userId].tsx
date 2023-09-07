import {
  useGetUserQuery,
  usePostHashtagMutation,
  useSetUserUpdateMutation,
} from "@/RTK/Apis/User";
import {
  deleteOneHashtag,
  ProfileUpdateSlice,
} from "@/RTK/Slices/ProfileUpdate";
import { RootState, useAppDispatch } from "@/RTK/store";
import { MentorProfilePatchReqDto } from "@/Types/MentorProfiles/MentorProfilePatchReq.dto";
import { Button } from "@/common";
import Layout from "@/components/Layout/Layout";
import { Input } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "@/RTK/Apis/Category";
import ProfileImage from "@/components/Profile/Image";
import ProfileInfo from "@/components/Profile/Info";
import ProfileCategories from "@/components/Profile/Categories";
import ProfileHashtag from "@/components/Profile/Hashtag";
import CategoryUpdateMultiple from "@/components/Profile/Update/CategoryUpdateMultiple";
import HashtagUpdateInput from "@/components/Profile/Update/HashtagUpdateInput";

const { TextArea } = Input;

export default function ProfileUpdate() {
  const route = useRouter();
  const { userId } = route.query;
  const [shortDescription, setShortDescription] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const { data: allCategories, isLoading, error } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  const formData = useSelector(
    (state: RootState) => state.rootReducers.profileUpdate,
  );
  const { data: UserData, isLoading: UserLoading } = useGetUserQuery(
    {
      id: Number(userId as string),
    },
    { skip: userId === undefined },
  );
  const [UserUpdate, { data: updateData, isLoading: updateLoading }] =
    useSetUserUpdateMutation();
  const [
    hashtagPost,
    { data: hashtagData, isLoading: hashtagLoading, isError: hashtagError },
  ] = usePostHashtagMutation();

  const cancelButtonHandler = () => {
    route.back();
  };

  const updateButtonHandler = () => {
    if (UserData) {
      const form: MentorProfilePatchReqDto = {};

      form.hashtags = formData.hashtags;
      form.categories = formData.categories;
      if (shortDescription.length !== 0) {
        form.shortDescription = shortDescription;
      }
      if (Description.length !== 0) {
        form.description = Description;
      }
      UserUpdate({
        id: Number(userId as string),
        profile: form,
      });
    }
  };

  useEffect(() => {
    if (hashtagData) {
      dispatch(ProfileUpdateSlice.actions.addHashtag(hashtagData));
    }
  }, [dispatch, hashtagData, hashtagLoading]);

  useEffect(() => {
    if (UserData) {
      dispatch(
        ProfileUpdateSlice.actions.setShortIntro(
          UserData.mentorProfile.shortDescription,
        ),
      );
      dispatch(
        ProfileUpdateSlice.actions.setIntro(UserData.mentorProfile.description),
      );
      dispatch(
        ProfileUpdateSlice.actions.setHashtags(UserData.mentorProfile.hashtags),
      );
      dispatch(
        ProfileUpdateSlice.actions.setCategories(
          UserData.mentorProfile.categories,
        ),
      );
      setDescription(UserData.mentorProfile.description);
      setShortDescription(UserData.mentorProfile.shortDescription);
    }
  }, [UserData, dispatch]);

  useEffect(() => {
    if (updateData) {
      route.push(`/Profile/${userId}`);
    }
  }, [route, updateData, updateLoading, userId]);

  return (
    <Layout>
      {UserData && !UserLoading && (
        <div className="ProfileWrapper">
          <div className="ProfileContainer">
            <div className="ProfileImageNameConatiner">
              <ProfileImage src={UserData.profileImage} />
              <ProfileInfo nickname={UserData.nickname} />
            </div>
            <div className="ShortDescriptionContainer">
              <TextArea
                showCount
                maxLength={50}
                value={shortDescription}
                style={{
                  marginBottom: 15,
                }}
                onChange={(e) =>
                  setShortDescription(e.target.value.slice(0, 50))
                }
                placeholder="최대 50글자"
                className="whitespace-pre-wrap"
              />
            </div>
            <div className="w-[60vw] ProfileTagWrapper">
              <span className="ProfileHeader">멘토링 분야</span>

              <ProfileCategories categories={formData.categories} />
              {allCategories && (
                <CategoryUpdateMultiple categories={allCategories} />
              )}
            </div>
            <div className="w-[90vw] ProfileTagWrapper">
              <span className="ProfileHeader">관심분야</span>
              <span className="ProfileSmall">태그를 클릭하면 사라집니다</span>
              <ProfileHashtag
                hashtag={formData.hashtags}
                onClick={(h) => {
                  dispatch(deleteOneHashtag(h));
                }}
              />
              <HashtagUpdateInput hashtags={formData.hashtags} />
            </div>

            <div className="ProfileDescriptionWrapper">
              <div className="ProfileHeader mb-5">소개글</div>
              <div className="ProfileDescription">
                <TextArea
                  placeholder="최대2000"
                  showCount
                  maxLength={2000}
                  value={Description}
                  style={{
                    marginBottom: 15,
                    height: 200,
                  }}
                  onChange={(e) => setDescription(e.target.value.slice(0, 50))}
                  className="whitespace-pre-wrap"
                />
              </div>
            </div>
            <div className="profile-update-btn-wrapper">
              <Button
                className="profile-update-cancel-btn"
                type="button"
                onClick={() => cancelButtonHandler()}
              >
                취소
              </Button>
              <Button
                className="profile-update-approve-btn"
                type="button"
                onClick={() => updateButtonHandler()}
              >
                수정완료
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
