import SearchInput from "@/components/Search/SearchInput";
import Link from "next/link";
import React from "react";

interface Props {
  Owner: number | null;
}

export const DesktopNav = ({ Owner }: Props) => {
  return (
    <div className="layout-desktop-container">
      <div className="flex">
        <Link href="/" className="layout-desktop-link-container">
          <span className="layout-desktop-title">42 Manito</span>
        </Link>
        <Link
          href="/Mentorings"
          className="layout-desktop-link-container ml-10"
        >
          <span className="layout-desktop-link">멘토링</span>
        </Link>
        {Owner !== 0 && (
          <Link
            href={`/Profile/${Owner}`}
            className="layout-desktop-link-container"
          >
            <span className="layout-desktop-link">프로필</span>
          </Link>
        )}
        <div className="absolute right-20">
          <SearchInput />
        </div>
      </div>
    </div>
  );
};
