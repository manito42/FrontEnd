import { CategoryDto } from "@/Types/CategoryDto";
import { HashtagPostDto } from "@/Types/HashtagDto";
import { UserResDto } from "@/Types/UserResDto";
import React, { useRef, useState } from "react";
import { Input } from "antd";
import HashtagCard from "./HashtagCard";

interface props {
  onClose: () => void;
  isVisible: boolean;
  data: UserResDto;
}

const { TextArea } = Input;

const ProfileUpdate = ({ onClose, isVisible, data }: props) => {
  const [zoomOut, setZoomOut] = useState(false);
  const [shortIntro, setShortIntro] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [hashtags, setHashtags] = useState<HashtagPostDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto>({} as CategoryDto);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleZoomOut = () => {
    setZoomOut(true);
    setTimeout(() => {
      onClose();
      setZoomOut(false);
    }, 400); // 줌아웃 에니메이션 실행 시간을 기다림
  };

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  if (!isVisible) {
    return null;
  }

  const handleSubmit = () => {
    // TODO: 여기서 완성된 정보들 보내기
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full px-20"
      id="wrapper"
    >
      <section
        className={`relative py-16 mentor-modal h-[80vh] ${
          zoomOut && "close-modal"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-5xl absolute top-0 right-5 -mb-5"
          onClick={handleZoomOut}
        >
          X
        </button>
        <div className=" px-4">
          <div
            className="relative flex flex-col break-words bg-white dark:bg-slate-500 w-[60vw] h-[70vh] mb-6 shadow-xl rounded-lg p-10 overflow-y-scroll"
            ref={scrollContainerRef}
          >
            <div className="w-full flex justify-end ">
              <button
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleSubmit()}
              >
                Submit.
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
                      onChange={(e) => setShortIntro(e.target.value)}
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
                      onChange={(e) => setIntro(e.target.value)}
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
                <form className="w-full max-w-sm p-5">
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
    </div>
  );
};

export default ProfileUpdate;
