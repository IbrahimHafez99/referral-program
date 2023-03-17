import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/src/components/Layout";
import { PopupsProdvider } from "@/src/context/PopupsContext";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout)
    return Component.getLayout(<Component {...pageProps} />);
  return (
    <PopupsProdvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PopupsProdvider>
  );
}
