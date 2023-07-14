import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "@/RTK/store";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Head>
          <title>42Mainto</title>
          <meta name="description" content="멘토링서비스" />
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
