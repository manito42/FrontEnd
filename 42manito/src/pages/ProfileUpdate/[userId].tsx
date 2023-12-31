import {
  useGetUserQuery,
  usePostHashtagMutation,
  useSetUserUpdateMutation,
} from "@/RTK/Apis/User";
import {
  deleteOneCategory,
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
import CategoryUpdateMultiple from "@/components/Profile/Update/CategoryUpdateMultiple";
import HashtagUpdateInput from "@/components/Profile/Update/HashtagUpdateInput";
import { ButtonType } from "@/Types/General/ButtonType";
import CardHashtag from "@/components/Global/CardHashtag";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const { TextArea } = Input;

export default function ProfileUpdate() {
  const route = useRouter();
  const { userId } = route.query;
  const [shortDescription, setShortDescription] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [socialLink, setSocialLink] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<string>("");
  const { data: allCategories, isLoading, error } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  const formData = useSelector(
    (state: RootState) => state.rootReducers.profileUpdate
  );
  const { data: UserData, isLoading: UserLoading } = useGetUserQuery(
    {
      id: Number(userId as string),
    },
    { skip: userId === undefined }
  );
  const [UserUpdate, { data: updateData, isLoading: updateLoading }] =
    useSetUserUpdateMutation();
  const [
    hashtagPost,
    { data: hashtagData, isLoading: hashtagLoading, isError: hashtagError },
  ] = usePostHashtagMutation();

  const socialLinkHandler = () => {
    if (socialLink === "") {
      setInvalidInput("");
      return true;
    }

    const socialLinkRegex =
      /^https:\/\/42born2code\.slack\.com\/team\/[a-zA-Z0-9_]+$/;
    if (socialLink !== null && socialLinkRegex.test(socialLink) === false) {
      setInvalidInput("슬랙 프로필 링크 형식을 확인해주세요.");
      return false;
    } else {
      setInvalidInput("");
    }
    return true;
  };

  const invalidInputMessage = (input: string) => {
    return <div className="text-red-500 text-sm ">{input}</div>;
  };

  const cancelButtonHandler = () => {
    route.back();
  };

  const updateButtonHandler = () => {
    if (socialLinkHandler() === false) {
      return;
    }
    if (UserData) {
      const form: MentorProfilePatchReqDto = {};

      form.hashtags = formData.hashtags;
      form.categories = formData.categories;
      form.shortDescription = shortDescription;
      form.description = Description;
      form.socialLink = socialLink === "" ? null : socialLink;

      if (invalidInput === "") {
        UserUpdate({
          id: Number(userId as string),
          profile: form,
        });
      }
    }
  };

  useEffect(() => {
    socialLinkHandler();
  }, [socialLink]);

  useEffect(() => {
    if (hashtagData) {
      dispatch(ProfileUpdateSlice.actions.addHashtag(hashtagData));
    }
  }, [dispatch, hashtagData, hashtagLoading]);

  useEffect(() => {
    if (UserData) {
      dispatch(
        ProfileUpdateSlice.actions.setShortIntro(
          UserData.mentorProfile.shortDescription
        )
      );
      dispatch(
        ProfileUpdateSlice.actions.setIntro(UserData.mentorProfile.description)
      );
      dispatch(
        ProfileUpdateSlice.actions.setHashtags(UserData.mentorProfile.hashtags)
      );
      dispatch(
        ProfileUpdateSlice.actions.setCategories(
          UserData.mentorProfile.categories
        )
      );
      dispatch(
        ProfileUpdateSlice.actions.setSocialLink(
          UserData.mentorProfile.socialLink
        )
      );
      setDescription(UserData.mentorProfile.description);
      setShortDescription(UserData.mentorProfile.shortDescription);
      setSocialLink(UserData.mentorProfile.socialLink);
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
        <div className="profile-wrapper">
          <div className="profile-container">
            <div className="profile-image-name-container">
              <ProfileImage src={UserData.profileImage} />
              <ProfileInfo nickname={UserData.nickname} />
            </div>
            <div className="short-description-wrapper">
              <span className="profile-title">짧은 소개글</span>
              <span className="profile-small-message">
                카드에서 표현되는 짧은 소개글입니다.
              </span>
              <div className="short-description-container">
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
            </div>
            <div className="w-[100%] profile-tag-wrapper">
              <span className="profile-title">멘토링 분야</span>
              <span className="profile-small-message">
                멘토가 될 분야를 선택해주세요.
              </span>
              <div className="profile-tag-list my-2">
                {formData.categories.length > 0 &&
                  formData.categories.map((category, idx) => (
                    <CardHashtag
                      name={category.name}
                      key={idx}
                      className={"text-sm"}
                      onClick={() => dispatch(deleteOneCategory(category.name))}
                    />
                  ))}
              </div>
              {allCategories && (
                <CategoryUpdateMultiple
                  categories={allCategories}
                  userCategories={formData.categories}
                />
              )}
            </div>
            <div className="w-[100%] profile-tag-wrapper">
              <span className="profile-title">세부 분야</span>
              <span className="profile-small-message pb-1">
                멘토링 세부 분야를 추가해주세요.
              </span>
              <span className="profile-small-message">
                태그를 클릭하면 사라집니다.
              </span>
              <div className="profile-tag-list my-2">
                {formData.hashtags.length > 0 &&
                  formData.hashtags.map((hashtag, idx) => (
                    <CardHashtag
                      name={hashtag.name}
                      key={idx}
                      sharp={true}
                      onClick={() => dispatch(deleteOneHashtag(hashtag.name))}
                      className={"text-sm"}
                    />
                  ))}
              </div>
              <HashtagUpdateInput hashtags={formData.hashtags} />
            </div>

            <div className="w-[100%] profile-social-link-wrapper">
              <span className="profile-title">
                슬랙 링크
                <a
                  href="https://github.com/manito42/guide/wiki/42-%EB%A7%88%EB%8B%88%EB%98%90-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0#%EC%8A%AC%EB%9E%99-%EB%A7%81%ED%81%AC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0"
                  target="_blank"
                >
                  <QuestionCircleOutlined className="text-gray-400 align-middle pb-1.5 pl-1 text-lg" />
                </a>
              </span>
              <span className="profile-small-message">
                슬랙 프로필 링크를 입력해주세요.
              </span>
              <TextArea
                className="profile-social-link-input-wrapper"
                placeholder="슬랙 프로필 링크를 입력해주세요"
                value={socialLink}
                onChange={(e) => {
                  setSocialLink(e.target.value);
                }}
              />
            </div>

            <div className="profile-description-wrapper">
              <div className="profile-title mb-5">소개글</div>
              <div className="profile-description">
                <TextArea
                  placeholder="소개글을 작성해주세요"
                  showCount
                  maxLength={1000}
                  value={Description}
                  style={{
                    marginBottom: 15,
                    height: 200,
                  }}
                  onChange={(e) => setDescription(e.target.value)}
                  className="whitespace-pre-wrap"
                />
              </div>
            </div>
            {invalidInput !== "" && invalidInputMessage(invalidInput)}
            <div className="profile-update-btn-wrapper">
              <Button
                buttonType={ButtonType.CANCEL}
                type="button"
                onClick={() => cancelButtonHandler()}
              >
                취소하기
              </Button>
              <Button
                buttonType={ButtonType.ACCEPT}
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
