import { UserResDto } from "@/Types/UserResDto";
import Enroll from "@/components/enroll/Enroll";
import Layout from "@/components/layout/Layout";
import React, { useState } from "react";
import { mocUser } from "../../mocData/mocUserData";
import Image from "next/image";
import TypeIt from "typeit-react";
import { Type } from "class-transformer";
import HobbyAnimation from "@/components/global/HobbyAnimaiton";
import DevelopAnimation from "@/components/global/DevelopAnimation";
import ProfileTypo from "@/components/Profile/ProfileTypo";

const Profile = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  const data: UserResDto = mocUser;

  // TODO: 로그인 상태가 아니면 로그인 페이지로 이동
  // TODO: 멘토가 아니라면  멘토 등록 알람 띄우기
  return (
    <Layout>
      <div className="app-container mt-20 flex flex-wrap">
        {isProfileOpen ? (
          <>
            <div className="flex flex-wrap w-full items-center justify-center">
              <Image
                alt="ProfileImage"
                src={data.profileImage}
                width={200}
                height={200}
                quality={100}
                style={{ borderRadius: "50%" }}
              />

              <div className="mx-10">
                <div className="" id="Count">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <TypeIt
                        options={{
                          loop: false,
                          speed: 50,
                          waitUntilVisible: true,
                          cursor: false,
                        }}
                      >
                        <span className="text-3xl font-bold block uppercase tracking-wide text-slate-800 dark:text-slate-200">
                          19
                        </span>
                      </TypeIt>
                      <span className="text-xl text-slate-600 dark:text-slate-400">
                        Month.
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <TypeIt
                        options={{
                          loop: false,
                          speed: 50,
                          waitUntilVisible: true,
                          cursor: false,
                        }}
                      >
                        <span className="text-3xl font-bold block uppercase tracking-wide text-slate-800 dark:text-slate-200">
                          2345
                        </span>
                      </TypeIt>

                      <span className="text-xl text-slate-600 dark:text-slate-400">
                        Total.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-4xl font-bold flex justify-center items-center">
                  {data.nickname}
                </div>
                <div className="text-2xl mt-14">
                  {data.mentorProfile.description}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center w-full my-3 md:my-28 h-[40vh]">
              <div className="flex flex-col justify-center items-center ">
                <span className="text-3xl font-bold text-slate-800 dark:text-slate-200 h-[5vh]">
                  카테고리.
                </span>
                {data.mentorProfile.categories[0].name === "DEVELOP" ? (
                  <DevelopAnimation />
                ) : (
                  <HobbyAnimation />
                )}
              </div>
              <div className="flex flex-col justify-between items-center md:ml-24 w-[40vh] h-[40vh]">
                <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                  해시태그.
                </span>
                <div className="flex flex-col overflow-y-scroll ">
                  {data.mentorProfile.hashtags.map((aTag) => (
                    <h6
                      className="m-3 p-3 rounded-md bg-sky-200 dark:bg-sky-700 "
                      key={aTag.id}
                    >
                      {aTag.name}
                    </h6>
                  ))}
                </div>
              </div>
            </div>
            <Enroll />
          </>
        ) : (
          <>
            <Enroll />
            <ProfileTypo />
            <div className="w-full flex justify-end">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                <button
                  className="text-blue-600 dark:text-white font-bold hover:scale-x-110 hover:scale-y-110 border-[rgba(255,255,255,100)] hover:border-b-[1px] text-5xl"
                  type="button"
                  onClick={() => {}}
                >
                  <span>신청하기 →</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
