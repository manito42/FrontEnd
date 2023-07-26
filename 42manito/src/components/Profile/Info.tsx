import React from "react";
import TypeIt from "typeit-react";

interface props {
  nickname: string;
  description: string;
  count: number;
}

export default function ProfileInfo({ nickname, description, count }: props) {
  return (
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
                {count}
              </span>
            </TypeIt>

            <span className="text-xl text-slate-600 dark:text-slate-400">
              Total.
            </span>
          </div>
        </div>
      </div>
      <div className="text-4xl font-bold flex justify-center items-center">
        {nickname}
      </div>
      <div className="text-2xl mt-14">{description}</div>
    </div>
  );
}
