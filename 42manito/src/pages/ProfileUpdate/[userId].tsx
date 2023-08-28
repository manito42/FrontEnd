import {
  useGetUserQuery,
  usePostHashtagMutation,
  useSetUserUpdateMutation,
} from "@/RTK/Apis/User";
import { ProfileUpdateSlice } from "@/RTK/Slices/ProfileUpdate";
import { useAppDispatch } from "@/RTK/store";
import { Button, Textarea } from "@/common";
import Layout from "@/components/Layout/Layout";
import HashtagCard from "@/components/Profile/HashtagCard";
import { Input } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ProfileUpdate() {
  const route = useRouter();
  const { userId } = route.query;
  const [shortDescription, setShortDescription] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [hashTagName, setHashTagName] = useState<string>("");
  const dispatch = useAppDispatch();
  const { data: UserData, isLoading: UserLoading } = useGetUserQuery(
    {
      id: Number(userId as string),
    },
    { skip: userId === undefined }
  );
  const [UserUpdate, {}] = useSetUserUpdateMutation();
  const [
    hashtagPost,
    { data: hashtagData, isLoading: hashtagLoading, isError: hashtagError },
  ] = usePostHashtagMutation();

  const hashtagPostHandler = () => {
    setHashTagName("");
    hashtagPost({ name: hashTagName });
  };

  useEffect(() => {
    if (hashtagData) {
      dispatch(ProfileUpdateSlice.actions.addHashtag(hashtagData));
    }
  }, [dispatch, hashtagData, hashtagLoading]);

  return (
    <Layout>
      <section className="app-container pt-32">
        <div className="mt-12 flex flex-col">
          <Button
            size="medium"
            onClick={() => UserUpdate()}
            className="uppercase"
          >
            submit
          </Button>

          <div className="">
            <div className="flex flex-row mt-3 px-8">
              {UserData &&
                UserData.mentorProfile.hashtags.map((hashtag, index) => (
                  <HashtagCard hashtag={hashtag.name} key={index} />
                ))}
            </div>
            <form className="w-full max-w-sm">
              <div className="flex items-center border-b border-slate-600 dark:border-slate-200 py-2 md:ml-7 overflow-x-scroll">
                <Input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Hashtag: ex) #프론트엔드"
                  aria-label="Full name"
                  value={hashTagName}
                  onChange={(e) => setHashTagName(e.target.value)}
                />
                <Button
                  onClick={() => hashtagPostHandler()}
                  className="flex-shrink-0 bg-pink-500 hover:bg-pink-600  text-xl text-white py-1 px-2 rounded"
                  type="button"
                >
                  추가
                </Button>
              </div>
            </form>
          </div>
          <Textarea
            placeholder="최대50"
            showCount
            maxLength={50}
            onChange={(e) =>
              dispatch(ProfileUpdateSlice.actions.setShortIntro(e.target.value))
            }
          />
          <Textarea
            placeholder="최대2000"
            showCount
            maxLength={2000}
            onChange={(e) =>
              dispatch(ProfileUpdateSlice.actions.setIntro(e.target.value))
            }
          />
        </div>
      </section>
    </Layout>
  );
}
