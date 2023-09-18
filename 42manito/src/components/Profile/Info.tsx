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
          <div className="text-4xl font-bold flex justify-center items-center flex-col">
            {nickname}
          </div>
        </div>
      </div>
    </div>
  );
}
