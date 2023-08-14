import { signOut } from "@/RTK/Slices/Global";
import { RootState, useAppDispatch } from "@/RTK/store";
import { SignIn } from "@/utils/SignIn";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function DrawerContent() {
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
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
      <Link href="/About">
        <p className="text-xl px-3 mt-10 m-5 btn-drawer">About.</p>
      </Link>
      {Owner !== 0 && !Number.isNaN(Owner) && (
        <Link href={`/Profile/${Owner}`}>
          <p className="text-xl px-3 m-5 btn-drawer">Profile.</p>
        </Link>
      )}
      <Link href="/Categories">
        <p className="text-xl px-3 m-5 btn-drawer">Category.</p>
      </Link>
      {/* <Link href="/Ranking">
              <p className="text-xl px-3 m-5 btn-drawer">Ranking.</p>
            </Link> */}
      {/* {Owner !== 0 && !Number.isNaN(Owner) && (
              <Link href="/Feedback">
                <p className="text-xl px-3 m-5 btn-drawer">Feedback.</p>
              </Link>
            )} */}
      <Divider className="dark:bg-slate-400 bg-slate-500 my-16" />
      {Owner === 0 && (
        <button id="42AuthSignIn" onClick={() => SignIn()}>
          <p className="text-xl  px-3 m-5 btn-drawer">Sign In.</p>
        </button>
      )}
      {Owner !== 0 && !Number.isNaN(Owner) && (
        <button id="SignOut" onClick={handleSingOut}>
          <p className="text-xl px-3 m-5 btn-drawer">Sign Out.</p>
        </button>
      )}
    </>
  );
}
