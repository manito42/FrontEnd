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
              <span className="text-3xl font-bold block uppercase tracking-wide text-neutral-800 dark:text-neutral-200">
                {count}
              </span>
              <span className="text-xl text-neutral-600 dark:text-neutral-400">
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
