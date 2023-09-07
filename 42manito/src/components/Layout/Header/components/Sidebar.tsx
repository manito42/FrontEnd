import { signOut } from "@/RTK/Slices/Global";
import { RootState, useAppDispatch } from "@/RTK/store";
import { SignIn } from "@/utils/SignIn";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import SearchInput from "@/components/Search/SearchInput";

interface props {
  onClose: () => void;
}

export default function Sidebar({ onClose }: props) {
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const dispatch = useAppDispatch();

  const handleSingOut = async () => {
    const id = localStorage.getItem("uid");
    if (id) {
      await localStorage.removeItem("uid");
      await localStorage.removeItem("accessToken");
      dispatch(signOut());
      location.reload();
    }
  };
  return (
    <>
      <div className="my-1 flex justify-center">
        <SearchInput />
      </div>
      <Link href="/" onClick={onClose}>
        <p className="sidebar-text sidebar-text-btn">Home</p>
      </Link>
      <Link href="/About" onClick={onClose}>
        <p className="sidebar-text sidebar-text-btn">About</p>
      </Link>
      {Owner !== 0 && !Number.isNaN(Owner) && (
        <Link href={`/Profile/${Owner}`} onClick={onClose}>
          <p className="sidebar-text sidebar-text-btn">Profile</p>
        </Link>
      )}
      <Divider className="dark:bg-bg_color-400 bg-bg_color-500 my-16" />
      {Owner === 0 && (
        <button
          id="42AuthSignIn"
          onClick={() => {
            onClose();
            return SignIn();
          }}
        >
          <p className="sidebar-text sidebar-text-btn">Sign In</p>
        </button>
      )}
      {Owner !== 0 && !Number.isNaN(Owner) && (
        <button id="SignOut" onClick={handleSingOut}>
          <p className="sidebar-text sidebar-text-btn">Sign Out</p>
        </button>
      )}
    </>
  );
}
