import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/src/components/Layout";
import { PopupsProdvider } from "@/src/context/PopupsContext";
import { AuthProvider } from "@/src/context/AuthContext";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";

import { Readex_Pro } from "next/font/google";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout)
    return Component.getLayout(<Component {...pageProps} />);
  return (
    <CookiesProvider>
      <AuthProvider>
        <PopupsProdvider>
          <main className={Readex.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </PopupsProdvider>
      </AuthProvider>
    </CookiesProvider>
  );
}
