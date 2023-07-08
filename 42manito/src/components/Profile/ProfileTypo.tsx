import React from "react";
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
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"내 "}
                </span>
              </div>
              <div>
                <span className="text-7xl text-pink-600">{TypoPoint1}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"과 "}
                </span>
              </div>
              <div>
                <span className="text-7xl text-pink-600">{TypoPoint2}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
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
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {" 그러면서 "}
                </span>
              </div>
              <div>
                <span className="text-8xl text-indigo-600">{TypoPoint3}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"을 "}
                </span>
              </div>
              <div>
                <span className="text-7xl text-pink-600">{TypoPoint4}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"하고 싶다면 "}
                </span>
              </div>
              <div>
                <span className="text-8xl text-indigo-600">{TypoPoint5}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
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
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"너도 누군가의 "}
                </span>
              </div>
              <div>
                <span className="text-7xl text-pink-600">{TypoPoint6}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"로 함께  "}
                </span>
              </div>
              <div>
                <span className="text-8xl text-indigo-600">{TypoPoint7}</span>
              </div>
              <div>
                <span className="text-6xl text-slate-800 dark:text-slate-200">
                  {"할 수 있다."}
                </span>
              </div>
            </div>
          </TypeIt>
        </div>
      </div>
    </div>
  );
};

export default ProfileTypo;
