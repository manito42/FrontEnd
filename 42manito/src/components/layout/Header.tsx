import React, { useState } from "react";
import Link from "next/link";
import DarkModeToggleButton from "./DarkModeButton";
import SearchInput from "./SearchInput";
import { UserResDto } from "@/Types/UserResDto";
import { Divider, Drawer } from "antd";

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // TODO : Login을 하면 isMentor 확인 후 false면 프로필 버튼 disabled

  return (
    <>
      <header className="text-gray-600 body-font bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center mb-4 md:mb-0"
          >
            <span className="ml-3 text-4xl hover:scale-105 hover:text-indigo-500">
              42Manito
            </span>
          </Link>
          <div className=" my-1 flex justify-center ml-10 ">
            <SearchInput />
          </div>
          <nav className="md:ml-auto flex flex-wrap items-center justify-center btn-drawer">
            <div className="mr-5" onClick={showDrawer}>
              <svg
                width="45px"
                height="45px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7ZM5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12ZM5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18H6C5.44772 18 5 17.5523 5 17Z"
                ></path>{" "}
              </svg>
            </div>
          </nav>
          <Drawer
            className="dark:bg-slate-600 px-4 fade-in"
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
          >
            <Link href="/About">
              <p className="text-xl px-3 mt-10 m-5 btn-drawer">About.</p>
            </Link>
            <Link href="/Profile">
              <p className="text-xl px-3 m-5 btn-drawer">Profile.</p>
            </Link>
            <Link href="/Category">
              <p className="text-xl px-3 m-5 btn-drawer">Category.</p>
            </Link>
            <Link href="/Ranking">
              <p className="text-xl px-3 m-5 btn-drawer">Ranking.</p>
            </Link>
            <Link href="/Feedback">
              <p className="text-xl px-3 m-5 btn-drawer">Feedback.</p>
            </Link>
            <Divider className="dark:bg-slate-400 bg-slate-500 my-16" />
            <Link href="/SignIn">
              <p className="text-xl  px-3 m-5 btn-drawer">Sign In.</p>
            </Link>
            <Link href="/SignOut">
              <p className="text-xl px-3 m-5 btn-drawer">Sign Out.</p>
            </Link>
          </Drawer>
          <DarkModeToggleButton />
        </div>
      </header>
    </>
  );
};

export default Header;
