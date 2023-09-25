import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "@/RTK/store";
import Head from "next/head";
import Script from "next/script";

// 서버 측의 store에 대한 참조를 반환하는 두 가지 새로운 함수를 추가합니다.

export default function App({ Component, pageProps }: AppProps) {
  // have to fix later
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", "light");
  }
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}}`}
        ></Script>
        <Script id={"google-analytics"}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}}');
          `}
        </Script>
        <Head>
          <title>42 Manito</title>
          <meta name="description" content="42 내부 멘토링 서비스" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://user-images.githubusercontent.com/86397600/250159799-efa4ccf2-daeb-46f0-8679-655e4f2587df.png"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
