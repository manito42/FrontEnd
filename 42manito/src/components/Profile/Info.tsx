import React from "react";

interface props {
  nickname: string;
  count?: number;
}

export default function ProfileInfo({ nickname, count }: props) {
  return (
    <div className="profile-info-wrapper">
      <div className="" id="Count">
        <div className="profile-info-container">
          {count !== undefined ? (
            <div className="p-3 text-center">
              <span className="text-3xl font-bold block uppercase tracking-wide text-slate-800 dark:text-slate-200">
                {count}
              </span>
              <span className="text-xl text-slate-600 dark:text-slate-400">
                Total
              </span>
            </div>
          ) : (
            <></>
          )}
          <div className="text-4xl font-bold flex justify-center items-center flex-col">
            {nickname}
          </div>
        </div>
      </div>
    </div>
  );
}
