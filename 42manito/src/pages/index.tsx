import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>42Mainto</title>
        <meta name="description" content="오늘도 빡코딩!" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://user-images.githubusercontent.com/86397600/250159799-efa4ccf2-daeb-46f0-8679-655e4f2587df.png"
        />
      </Head>
    </Layout>
  );
}
