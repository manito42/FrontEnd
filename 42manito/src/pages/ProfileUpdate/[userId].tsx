import {
  useGetUserQuery,
  usePostHashtagMutation,
  useSetUserUpdateMutation,
} from "@/RTK/Apis/User";
import { ProfileUpdateSlice } from "@/RTK/Slices/ProfileUpdate";
import { RootState, useAppDispatch } from "@/RTK/store";
import { MentorProfilePatchReqDto } from "@/Types/MentorProfiles/MentorProfilePatchReq.dto";
import { Button } from "@/common";
import Layout from "@/components/Layout/Layout";
import HashtagCard from "@/components/Profile/HashtagCard";
import { Input } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "@/RTK/Apis/Category";
import CategoryCard from "@/components/Profile/CategoryCard";

const { TextArea } = Input;

export default function ProfileUpdate() {
  const route = useRouter();
  const { userId } = route.query;
  const [shortDescription, setShortDescription] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [hashTagName, setHashTagName] = useState<string>("");
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

  const hashtagPostHandler = () => {
    const doesHashtagExist = formData.hashtags.some(
      (hashtag) => hashtag.name === hashTagName,
    );
    // 정규 표현식으로 영어(a-z, A-Z), 한글(가-힣), 숫자(0-9)를 제외한 모든 문자 찾기
    const regex = /[^a-zA-Z0-9가-힣]/g;

    if (
      !doesHashtagExist &&
      hashTagName.length > 2 &&
      !regex.test(hashTagName)
    ) {
      // 입력된 해시태그가 위의 조건들을 만족하면 새로운 해시태그 추가
      hashtagPost({ name: hashTagName });
      setHashTagName("");
    } else if (regex.test(hashTagName)) {
      alert("3글자 이상의 한글, 영어, 숫자만 추가 가능합니다.");
      setHashTagName("");
    }
  };

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
      <section className="app-container pt-32">
        <div className="flex flex-wrap items-center justify-center w-[60vw] mt-14">
          <div className="mt-3 flex flex-col w-[90%]">
            <div className="flex flex-row flex-wrap justify-between">
              <div className="w-full text-3xl font-bold">카테고리</div>
              <div className="flex flex-col md:flex-row my-3 overflow-y-auto mt-1">
                {allCategories &&
                  allCategories.map((category, index) => (
                    <CategoryCard
                      category={category.name}
                      active={
                        formData.categories.some(
                          (cat) => category.name === cat.name,
                        ) as boolean
                      }
                      onClick={(isActive: boolean) => {
                        if (isActive)
                          dispatch(
                            ProfileUpdateSlice.actions.deleteOneCategory(
                              category.name,
                            ),
                          );
                        else
                          dispatch(
                            ProfileUpdateSlice.actions.addCategory(category),
                          );
                      }}
                      key={index}
                    />
                  ))}
              </div>
            </div>
            <div className="flex w-full flex-col">
              <div className="w-full text-3xl font-bold mt-5">관심 분야</div>
              <div className="flex flex-row my-3 overflow-x-auto mt-1">
                {formData &&
                  formData.hashtags.map((hashtag, index) => (
                    <HashtagCard hashtag={hashtag.name} key={index}>
                      <button
                        className="text-slate-600 dark:text-white text-2xl font-bold"
                        onClick={() =>
                          dispatch(
                            ProfileUpdateSlice.actions.deleteOneHashtag(
                              hashtag.name,
                            ),
                          )
                        }
                      >
                        X
                      </button>
                    </HashtagCard>
                  ))}
              </div>
              <div className="flex flex-row w-full justify-between items-center mt-1">
                <TextArea
                  placeholder="Hashtag (3글자 이상, 한영, 숫자): ex) frontend"
                  maxLength={20}
                  value={hashTagName}
                  onChange={(e) => {
                    if (e.target.value.includes("\n")) return;
                    setHashTagName(e.target.value);
                  }}
                  onPressEnter={(e) => {
                    hashtagPostHandler();
                  }}
                  className="mr-3 w-full whitespace-pre-wrap"
                />
                <Button
                  onClick={() => hashtagPostHandler()}
                  className="flex-shrink-0 bg-pink-500 hover:bg-pink-600  text-s font-bold text-white py-1 px-2 rounded"
                  type="button"
                >
                  추가
                </Button>
              </div>
            </div>
            <div className="w-full mt-5">
              <div className="w-full text-3xl font-bold mb-5">짧은 소개글</div>
              <TextArea
                showCount
                maxLength={50}
                value={shortDescription}
                style={{
                  height: 80,
                  marginBottom: 24,
                }}
                onChange={(e) =>
                  setShortDescription(e.target.value.slice(0, 50))
                }
                placeholder="최대 50글자"
                className="whitespace-pre-wrap"
              />
            </div>
            <div className="w-full mt-5">
              <div className="w-full text-3xl font-bold mb-5">소개글</div>
              <TextArea
                placeholder="최대2000"
                showCount
                value={Description}
                maxLength={2000}
                style={{
                  height: 160,
                  marginBottom: 24,
                }}
                onChange={(e) => setDescription(e.target.value.slice(0, 2000))}
              />
            </div>
          </div>
          <div className="flex w-full justify-center mt-3 mb-5">
            <Button
              className="text-xs  md:text-s bg-gray-500 hover:bg-gray-600 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => cancelButtonHandler()}
            >
              취소
            </Button>
            <Button
              className="text-xs  md:text-s bg-pink-500 hover:bg-pink-600 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => updateButtonHandler()}
            >
              수정완료
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
