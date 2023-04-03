import { verifyAuth } from "@/lib/auth";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect, ReactElement } from "react";
import NoLayout from "@/src/components/NoLayout";
import { useCookies } from "react-cookie";
import { api } from "@/src/apis/configs/fetchConfig";

type Props = {
  token?: string;
  isVerified: boolean;
  errorMessage?: string;
};

const EmailVerficationPage = (props: Props) => {
  const [cookie, setCookie] = useCookies(["jwt"]);
  const seconds = 3;
  const [counter, setCounter] = useState(seconds);
  const router = useRouter();
  useEffect(() => {
    if (props.isVerified && props.token && !cookie.jwt)
      setCookie("jwt", props.token, { path: "/" });
  }, [props.isVerified, props.token, setCookie, cookie]);
  useEffect(() => {
    if (props.isVerified) {
      if (counter > 0) {
        const timer = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }
    }
  }, [counter, props.isVerified]);

  useEffect(() => {
    if (props.isVerified) {
      const redirectTimer = setTimeout(() => {
        router.push("/dashboard");
      }, seconds * 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [router, seconds, props.isVerified]);

  const content = (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      {props.isVerified ? (
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Redirecting to Home Page in {counter} seconds...
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-red-500 mb-8">
          Oops! {props.errorMessage}
        </h1>
      )}
      <div className="w-20 h-20 rounded-full bg-blue-500 animate-pulse"></div>
    </div>
  );

  return content;
};

export default EmailVerficationPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.params?.token as string;
  try {
    const payload = await verifyAuth(token);

    if (payload) {
      const response = await api("/api/auth/confirm", token, "PATCH");
      return { props: { token: response.data.token, isVerified: true } };
    }
  } catch (error: any) {
    return { props: { isVerified: false, errorMessage: error.message } };
  }
}

EmailVerficationPage.getLayout = function getLayout(page: ReactElement) {
  return <NoLayout>{page}</NoLayout>;
};
