import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  // 다른 탭에서 로그인 상태 변경시 즉시 반응을 위함.
  const router = useRouter();
  useEffect(() => {
    const handleStorage = () => {
      router.reload();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
