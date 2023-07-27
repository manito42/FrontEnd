import { signIn } from "@/RTK/Slices/Global";
import { useAppDispatch } from "@/RTK/store";
import Layout from "@/components/Layout/Layout";
import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { uid, token } = router.query;

  const setUser = async () => {
    if (uid && token) {
      await localStorage.setItem("accessToken", token as string);
      await localStorage.setItem("uid", uid as string);
      dispatch(signIn(Number(uid)));
      router.push("/");
    }
  };

  useEffect(() => {
    console.log(router.query);
    setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token]);

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <Spin />
      </div>
    </Layout>
  );
}
