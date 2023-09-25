import { signIn } from "@/RTK/Slices/Global";
import { useAppDispatch } from "@/RTK/store";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "@/components/Global/Loading";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { uid, token } = router.query;

  const setUser = async () => {
    if (uid && token) {
      localStorage.setItem("accessToken", token as string);
      localStorage.setItem("uid", uid as string);
      dispatch(signIn(Number(uid)));
      router.push("/");
    }
  };

  useEffect(() => {
    setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token]);

  return (
    <Layout>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center" />
      <Loading />
    </Layout>
  );
}
