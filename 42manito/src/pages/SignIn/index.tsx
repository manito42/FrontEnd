import Layout from "@/components/Layout/Layout";
import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function SignIn() {
  const router = useRouter();

  const { uid, token } = router.query;

  useEffect(() => {
    if (uid && token) {
      localStorage.setItem("accessToken", token as string);
      localStorage.setItem("uid", uid as string);
      router.push("/");
    }
  }, []);

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <Spin />
      </div>
    </Layout>
  );
}
