import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Props {
  showSidebar: () => void;
}

export const MobileNav = ({ showSidebar }: Props) => {
  return (
    <div className="layout-mobile-container">
      <div className="flex">
        <button onClick={showSidebar} className="layout-btn">
          <UnorderedListOutlined style={{ fontSize: 20 }} />
        </button>
        <Link href="/" className="layout-mobile-link-container">
          <span className="layout-mobile-title">42 Manito</span>
        </Link>
      </div>
    </div>
  );
};
