import { useGetUserQuery, useSetMentorAcceptMutation } from "@/RTK/Apis/User";
import { RootState } from "@/RTK/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TypeIt from "typeit-react";

const ProfileTypo = () => {
  const mainTypo: string =
    "내 지식과 경험, 그러면서 열정을 공유하고 싶다면 지금 바로 멘토 신청! 너도 누군가의 이상적인 멘토로 함께 성장할 수 있다.";
  const Typo1: string = "내 지식과 경험,";
  const Typo2: string = "그러면서 열정을 공유하고 싶다면 지금 바로 멘토 신청!";
  const Typo3: string = " 너도 누군가의 이상적인 멘토로 함께 성장할 수 있다.";

  const TypoPoint1: string = "지식";
  const TypoPoint2: string = "경험";
  const TypoPoint3: string = `"열정"`;
  const TypoPoint4: string = "공유";
  const TypoPoint5: string = `"멘토 신청"`;
  const TypoPoint6: string = "이상적인 멘토";
  const TypoPoint7: string = `"성장"`;

  const [setMentor, { data, isLoading, error }] = useSetMentorAcceptMutation();
  const Owner = useSelector((state: RootState) => state.rootReducers.global);
  const { data: Userdata, isLoading: UserIsLoading } = useGetUserQuery({
    id: Owner.uId as number,
  });

  const handleAccept = () => {
    if (Owner.uId !== 0 && Userdata) {
      setMentor({
        id: Owner.uId as number,
      });
    }
  };

  useEffect(() => {
    if (data) {
      alert("멘토 신청이 완료되었습니다.");
    }
  }, [data]);

  if (UserIsLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className=" flex flex-col min-h-[80vh] p-5 items-start justify-center text-7xl font-bold md:mx-0">
      <div className="mt-16">
        <div className="mt-5">
          <TypeIt
            options={{
              loop: false,
              speed: 50,
              waitUntilVisible: true,
              cursor: false,
            }}
          >
            <div className="flex flex-wrap ">
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"내 "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl lg:text-7xl text-pink-600">
                  {TypoPoint1}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"과 "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl lg:text-7xl text-pink-600">
                  {TypoPoint2}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {", "}
                </span>
              </div>
            </div>
          </TypeIt>
        </div>
        <div className="mt-5">
          <TypeIt
            options={{
              loop: false,
              speed: 50,
              waitUntilVisible: true,
              cursor: false,
              startDelay: Typo1.length * 65,
            }}
          >
            <div className="flex flex-wrap ">
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {" 그러면서 "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-6xl lg:text-8xl text-indigo-600">
                  {TypoPoint3}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"을 "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl lg:text-7xl text-pink-600">
                  {TypoPoint4}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"하고 싶다면 "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-6xl lg:text-8xl text-indigo-600">
                  {TypoPoint5}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"!"}
                </span>
              </div>
            </div>
          </TypeIt>
        </div>
        <div className="mt-5">
          <TypeIt
            options={{
              loop: false,
              speed: 50,
              waitUntilVisible: true,
              cursor: false,
              startDelay: Typo2.length * 66,
            }}
          >
            <div className="flex flex-wrap ">
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"너도 누군가의 "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl lg:text-7xl text-pink-600">
                  {TypoPoint6}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"로 함께  "}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-6xl lg:text-8xl text-indigo-600">
                  {TypoPoint7}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-800 dark:text-slate-200">
                  {"할 수 있다."}
                </span>
              </div>
            </div>
          </TypeIt>
        </div>
        <div className="w-full flex justify-end">
          <div className="py-6 px-3 mt-32 sm:mt-0">
            <button
              className="text-blue-600 dark:text-white font-bold hover:scale-x-110 hover:scale-y-110 border-[rgba(255,255,255,100)] hover:border-b-[1px] text-5xl"
              type="button"
              onClick={handleAccept}
            >
              <span className="text-4xl sm:text-5xl lg:text-7xl">
                신청하기 →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTypo;
