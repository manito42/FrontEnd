import React, { memo, useEffect, useReducer, useRef, useState } from "react";
import { Input } from "antd";
import { RootState, useAppDispatch } from "@/RTK/store";
import { useSelector } from "react-redux";
import { ProfileUpdateSlice } from "@/RTK/Slices/ProfileUpdate";
import { UserDefaultDto } from "@/Types/Users/UserDefault.dto";
import ConnectModal from "@/components/Connect/ConnectModal";
import HashtagCard from "../HashtagCard";

interface props {
  onClose: () => void;
  data: UserDefaultDto;
}

const { TextArea } = Input;

const ProfileUpdate = ({ onClose, data }: props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const state = useSelector(
    (state: RootState) => state.rootReducers.profileUpdate
  );

  const handleZoomOut = () => {
    dispatch(ProfileUpdateSlice.actions.setZoomOut(true));
    setTimeout(() => {
      dispatch(ProfileUpdateSlice.actions.deleteAll());
      dispatch(ProfileUpdateSlice.actions.setZoomOut(false));
      onClose();
    }, 300); // 줌아웃 에니메이션 실행 시간을 기다림
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleSubmit = () => {
    dispatch(ProfileUpdateSlice.actions.setDisabled(true));
    handleConnectOpen();
    // TODO: 여기서 완성된 정보들 보내기
    dispatch(ProfileUpdateSlice.actions.setDisabled(false));
  };

  const handleConnectOpen = () => {
    dispatch(ProfileUpdateSlice.actions.setViewConnectModal(true));
  };

  const handleConnectClose = () => {
    dispatch(ProfileUpdateSlice.actions.setViewConnectModal(false));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full px-3 md:px-20"
      id="wrapper"
    >
      <section
        className={`relative py-16 mentor-modal h-[80vh] ${
          state.zoomOut && "close-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-5xl absolute top-0 right-5 -mb-5"
          onClick={handleZoomOut}
        >
          X
        </button>
        <div className="">
          <div
            className="relative flex flex-col break-words bg-white dark:bg-slate-500 w-[90vw] md:w-[60vw] h-[70vh] mb-6 p-5 shadow-xl rounded-lg overflow-y-scroll"
            ref={scrollContainerRef}
          >
            <div className="w-full flex justify-end">
              <button
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleSubmit()}
                disabled={state.disabled}
              >
                Submit
              </button>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold mt-7">짧은 소개글 수정</span>
              <div className="p-5 flex flex-col">
                <div className="flex flex-wrap w-full">
                  <span className="text-xl font-bold min-w-[100px] mt-3">
                    Before.
                  </span>
                  <div className="md:ml-7 border border-gray-300 rounded-sm p-2 w-full mt-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      {data.mentorProfile.shortDescription}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap mt-3 w-full">
                  <span className="text-xl font-bold min-w-[100px] w-full mt-3">
                    After.
                  </span>
                  <div className="md:ml-7 w-full mt-3">
                    <TextArea
                      showCount
                      maxLength={50}
                      style={{ height: 80, marginBottom: 24 }}
                      onChange={(e) =>
                        dispatch(
                          ProfileUpdateSlice.actions.setShortIntro(
                            e.target.value
                          )
                        )
                      }
                      placeholder="최대 50글자"
                    />
                  </div>
                </div>
              </div>
              <span className="text-3xl font-bold mt-7">소개글 수정</span>
              <div className="p-5 flex flex-col">
                <div className="flex flex-wrap w-full">
                  <span className="text-xl font-bold min-w-[100px]">
                    Before.
                  </span>
                  <div className="md:ml-7 border border-gray-300 rounded-sm p-2 w-full mt-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      {data.mentorProfile.description}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap mt-3 w-full">
                  <span className="text-xl font-bold min-w-[100px] w-full mt-3">
                    After.
                  </span>
                  <div className="md:ml-7 w-full mt-3">
                    <TextArea
                      showCount
                      maxLength={1000}
                      style={{ height: 80, marginBottom: 24 }}
                      onChange={(e) =>
                        dispatch(
                          ProfileUpdateSlice.actions.setIntro(e.target.value)
                        )
                      }
                      placeholder="최대 1000글자"
                    />
                  </div>
                </div>
              </div>

              <span className="text-3xl font-bold mt-7">해시태그 수정</span>
              <div className="">
                <div className="flex flex-row mt-3 px-8">
                  {data.mentorProfile.hashtags.map((hashtag, index) => (
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
                    />
                    <button
                      className="flex-shrink-0 bg-pink-500 hover:bg-pink-600  text-xl text-white py-1 px-2 rounded"
                      type="button"
                    >
                      추가
                    </button>
                  </div>
                </form>
              </div>
              <span className="text-3xl font-bold mt-7">카테고리 수정</span>
            </div>
          </div>
        </div>
      </section>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-center w-[4vw] h-[4vw] min-w-[55px] min-h-[55px] text-4xl font-bold"
        style={{ zIndex: 1000 }}
      >
        ↑
      </button>
      {state.viewConnectModal && (
        <ConnectModal
          message={"수정하시겠습니까?"}
          onClose={handleConnectClose}
          handleYes={handleSubmit}
        />
      )}
    </div>
  );
};

const validation = (prev: props, next: props) => {
  if (prev.data.updatedAt === next.data.updatedAt) {
    return true;
  } else {
    return false;
  }
};

export default memo(ProfileUpdate, validation);
