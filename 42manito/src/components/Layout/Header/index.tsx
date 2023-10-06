import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { RootState, useAppDispatch } from "@/RTK/store";
import {
  signIn,
  signOut,
  openSidebar,
  closeSidebar,
} from "@/RTK/Slices/Global";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import { SignIn } from "@/utils/SignIn";
import Loading from "@/components/Global/Loading";
import { useRouter } from "next/router";
import { DesktopNav } from "./components/DesktopNav";
import { MobileNav } from "./components/MobileNav";

export default function Header() {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.rootReducers.global.isSidebarOpen,
  );
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId,
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSingOut = () => {
    const id = localStorage.getItem("uid");
    if (id) {
      localStorage.removeItem("uid");
      localStorage.removeItem("accessToken");
      dispatch(signOut());
      router.reload();
    }
  };

  const showSidebar = () => {
    dispatch(openSidebar());
  };
  const onClose = () => {
    dispatch(closeSidebar());
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
        <div className="layout-header-container">
          <div className="layout-nav-container">
            <DesktopNav Owner={Owner} />
            <MobileNav showSidebar={showSidebar} />
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
          <Drawer
            className="dark:bg-bg_color-600 px-4 fade-in md:pt-10"
            placement="left"
            closable={false}
            onClose={onClose}
            open={isSidebarOpen}
            width={"320px"}
          >
            <Sidebar onClose={onClose} onSignIn={handleLoading} />
          </Drawer>
        </div>
      </header>
      {loading && <Loading />}
    </>
  );
}
