import {
  useGetUserQuery,
  usePostHashtagMutation,
  useSetUserUpdateMutation,
} from "@/RTK/Apis/User";
import { ProfileUpdateSlice } from "@/RTK/Slices/ProfileUpdate";
import { RootState, useAppDispatch } from "@/RTK/store";
import { MentorProfilePatchReqDto } from "@/Types/MentorProfiles/MentorProfilePatchReq.dto";
import { Button, Textarea } from "@/common";
import ManitoLottieAnimation from "@/common/LottieAnimation/LottieAnimation";
import Layout from "@/components/Layout/Layout";
import HashtagCard from "@/components/Profile/HashtagCard";
import { Input } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hobby from "../../../public/panda-sing.json";
import Develop from "../../../public/happy-developer-red.json";

const { TextArea } = Input;

export default function ProfileUpdate() {
  const route = useRouter();
  const { userId } = route.query;
  const [shortDescription, setShortDescription] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [hashTagName, setHashTagName] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState(""); // 선택된 값을 저장하는 상태

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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value); // 선택된 값 업데이트
  };

  const hashtagPostHandler = () => {
    console.log(hashTagName);
    hashtagPost({ name: hashTagName });
    setHashTagName("");
  };

  const updateButtonHandler = () => {
    if (UserData) {
      const form: MentorProfilePatchReqDto = new Object();

      form.hashtags = formData.hashtags;
      if (shortDescription.length !== 0) {
        form.shortDescription = shortDescription;
      }
      if (Description.length !== 0) {
        form.description = Description;
      }
      if (selectedValue.length !== 0) {
        if (selectedValue === "study") {
          form.categories = [{ id: 1, name: "DEVELOPMENT" }];
        }
        if (selectedValue === "hobby") {
          form.categories = [{ id: 2, name: "HOBBY" }];
        }
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
          UserData.mentorProfile.shortDescription
        )
      );
      dispatch(
        ProfileUpdateSlice.actions.setIntro(UserData.mentorProfile.description)
      );
      dispatch(
        ProfileUpdateSlice.actions.setHashtags(UserData.mentorProfile.hashtags)
      );
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
        <div className="flex w-full justify-end">
          <Button
            className="text-xs  md:text-s bg-pink-500 hover:bg-pink-600 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => updateButtonHandler()}
          >
            수정하기
          </Button>
        </div>
        <div className="mt-32 flex flex-col w-[90%]">
          <div className="flex flex-row flex-wrap justify-between my-10">
            <div className="flex flex-col items-center">
              <input
                className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="radio"
                name="manito"
                value="study"
                checked={selectedValue === "study"} // 선택 여부 확인
                onChange={handleRadioChange}
              />
              <label className="text-3xl font-bold">Develop.</label>
              <ManitoLottieAnimation size="medium" animationData={Develop} />
            </div>
            <div className="flex flex-col items-center">
              <input
                className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="radio"
                name="manito"
                value="hobby"
                checked={selectedValue === "hobby"} // 선택 여부 확인
                onChange={handleRadioChange}
              />
              <label className="text-3xl font-bold">Hobby.</label>
              <ManitoLottieAnimation size="medium" animationData={Hobby} />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="w-full text-3xl font-bold mb-5">해시태그.</div>
            <div className="flex flex-row my-3 px-8">
              {formData &&
                formData.hashtags.map((hashtag, index) => (
                  <HashtagCard hashtag={hashtag.name} key={index}>
                    <button
                      className="text-slate-600 dark:text-white text-2xl font-bold"
                      onClick={() =>
                        dispatch(
                          ProfileUpdateSlice.actions.deleteOneHashtag(
                            hashtag.name
                          )
                        )
                      }
                    >
                      X
                    </button>
                  </HashtagCard>
                ))}
            </div>
            <div className="flex flex-row w-full justify-between items-center">
              <TextArea
                placeholder="Hashtag: ex) #프론트엔드"
                maxLength={20}
                value={hashTagName}
                onChange={(e) => setHashTagName(e.target.value)}
                className="m-10 h-10 w-full"
              />
              <Button
                onClick={() => hashtagPostHandler()}
                className="flex-shrink-0 h-10 bg-pink-500 hover:bg-pink-600  text-s font-bold text-white py-1 px-2 rounded"
                type="button"
              >
                추가
              </Button>
            </div>
          </div>
          <div className="w-full my-8">
            <div className="w-full text-3xl font-bold mb-5">짧은 소개글.</div>
            <TextArea
              showCount
              maxLength={50}
              value={shortDescription}
              style={{
                height: 80,
                marginBottom: 24,
              }}
              onChange={(e) => setShortDescription(e.target.value.slice(0, 50))}
              placeholder="최대 50글자"
            />
          </div>
          <div className="w-full my-8">
            <div className="w-full text-3xl font-bold mb-5">소개글.</div>
            <TextArea
              placeholder="최대2000"
              showCount
              value={Description}
              maxLength={2000}
              style={{
                height: 80,
                marginBottom: 24,
              }}
              onChange={(e) => setDescription(e.target.value.slice(0, 2000))}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
