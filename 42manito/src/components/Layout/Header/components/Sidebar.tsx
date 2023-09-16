import { signOut } from "@/RTK/Slices/Global";
import { RootState, useAppDispatch } from "@/RTK/store";
import { SignIn } from "@/utils/SignIn";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import SearchInput from "@/components/Search/SearchInput";

interface props {
  onClose: () => void;
  onSignIn: () => void;
}

export default function Sidebar({ onClose, onSignIn }: props) {
  const uid = useSelector((state: RootState) => state.rootReducers.global.uId);
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
      <Link href="/Mentorings" onClick={onClose}>
        <p className="sidebar-text sidebar-text-btn">Mentorings</p>
      </Link>
      {
        !!uid(
          <Link href={`/Profile/${uid}`} onClick={onClose}>
            <p className="sidebar-text sidebar-text-btn">Profile</p>
          </Link>,
        )
      }
      {!uid && (
        <button
          id="42AuthSignIn"
          onClick={() => {
            onClose();
            onSignIn();
            return SignIn();
          }}
        >
          <p className="sidebar-text sidebar-text-btn">Sign In</p>
        </button>
      )}
      {!!uid && !Number.isNaN(uid) && (
        <button id="SignOut" onClick={handleSingOut}>
          <p className="sidebar-text sidebar-text-btn">Sign Out</p>
        </button>
      )}
    </>
  );
}
