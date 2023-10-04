import Image from "next/image";
import React from "react";

interface props {
  nickname: string;
  count?: number;
  socialLink?: string;
}

export default function ProfileInfo({ nickname, count, socialLink }: props) {
  return (
    <div className="profile-info-wrapper">
      <div className="" id="Count">
        <div className="profile-info-container">
          <div className="text-4xl font-bold flex justify-center items-center">
            {nickname}
            {socialLink !== undefined && (
              <a href={socialLink} target="_blank">
                <Image
                  alt="slack-icon"
                  width={24}
                  height={24}
                  className="ml-2"
                  src="/Slack-mark-RGB.png"
                ></Image>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
