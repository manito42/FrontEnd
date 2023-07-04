import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "../components/Layout";
import Enroll from "@/components/home/Enroll";

export default function Home() {
  return (
    <Layout>
      <Enroll />
    </Layout>
  );
}
