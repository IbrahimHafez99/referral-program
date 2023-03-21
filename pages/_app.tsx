import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/src/components/Layout";
import { PopupsProdvider } from "@/src/context/PopupsContext";
import { AuthProvider } from "@/src/context/AuthContext";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
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
    <CookiesProvider>
      <AuthProvider>
        <PopupsProdvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PopupsProdvider>
      </AuthProvider>
    </CookiesProvider>
  );
}
