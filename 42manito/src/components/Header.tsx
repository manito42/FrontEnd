import React, { useState } from "react";
import Link from "next/link";
import DarkModeToggleButton from "./DarkModeButton";
import { Divider, Drawer } from "antd";
import SearchInput from "./SearchInput";
import InfoAlert from "./alert/InfoAlert";

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-3xl">42Manito</span>
          </Link>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <div className=" my-1 flex justify-center mx-5 ">
              <SearchInput />
            </div>
            <Link href="/Category" className="mr-5 hover:text-gray-900">
              카테고리
            </Link>
            <Link href="/Profile" className="mr-5 hover:text-gray-900">
              프로필
            </Link>
            <a className="mr-5 hover:text-gray-900" onClick={showDrawer}>
              메뉴
            </a>
          </nav>
          <Drawer
            className="dark:bg-slate-600 px-4 fade-in"
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
            width="25%"
          >
            <Link href="/Ranking">
              <p className="text-xl px-3 mt-24">랭킹</p>
            </Link>

            <Divider className="dark:bg-white mt-7 mb-7" />
            <Link href="/Feedback">
              <p className="text-xl px-3 mt-4">피드백</p>
            </Link>
          </Drawer>
          <DarkModeToggleButton />
        </div>
      </header>
    </>
  );
};

export default Header;
