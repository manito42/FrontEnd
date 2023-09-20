import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { RootState, useAppDispatch } from "@/RTK/store";
import { signIn, signOut } from "@/RTK/Slices/Global";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import { SignIn } from "@/utils/SignIn";
import { UnorderedListOutlined } from "@ant-design/icons";
import Loading from "@/components/Global/Loading";
import { useRouter } from "next/router";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSingOut = async () => {
    const id = localStorage.getItem("uid");
    if (id) {
      await localStorage.removeItem("uid");
      await localStorage.removeItem("accessToken");
      dispatch(signOut());
      if (router.pathname !== "/") location.href = "/";
      else location.reload();
    }
  };

  const showSidebar = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (Owner === null) {
      const id = localStorage.getItem("uid");
      if (id !== null) {
        dispatch(signIn(Number(id)));
      } else {
        dispatch(signIn(0));
      }
    }
    return () => {};
  }, [Owner, dispatch]);

  return (
    <>
      <header className="layout-header">
        <div className="layout-header-container ">
          <div className="flex flex-row justify-between items-center w-full absolute">
            <button onClick={showSidebar} className="layout-btn">
              <UnorderedListOutlined style={{ fontSize: 20 }} />
            </button>
            {Owner === 0 && (
              <button
                id="42AuthSignIn"
                className="layout-btn layout-sign-btn"
                onClick={() => {
                  onClose();
                  setLoading(true);
                  return SignIn();
                }}
              >
                로그인
              </button>
            )}
            {Owner !== 0 && !Number.isNaN(Owner) && (
              <button
                id="SignOut"
                className="layout-btn layout-sign-btn"
                onClick={handleSingOut}
              >
                로그아웃
              </button>
            )}
          </div>
          <Link
            href="/"
            className="flex flex-wrap title-font font-medium items-center z-10"
          >
            <span className=" text-2xl font-extrabold hover:text-indigo-500">
              42 Manito
            </span>
          </Link>
          <Drawer
            className="dark:bg-bg_color-600 px-4 fade-in md:pt-10"
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
          >
            <Sidebar onClose={onClose} onSignIn={handleLoading} />
          </Drawer>
        </div>
      </header>
      {loading && <Loading />}
    </>
  );
}
