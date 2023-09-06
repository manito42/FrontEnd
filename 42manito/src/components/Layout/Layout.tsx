import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
