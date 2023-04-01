import React, { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import Input from "@/src/components/Input";
import Alert from "@/src/components/Alert";
import type { LoginFormData } from "@/src/types/UserLoginForm";
import { usePopupsContext } from "@/src/context/PopupsContext";
import { useAuth } from "../../src/hooks/useAuth";
import NoLayout from "@/src/components/NoLayout";
import { useAuthContext } from "@/src/context/AuthContext";
import Loader from "@/src/components/Loader";
import Link from "next/link";
const reset = { email: "", password: "" };

const Login: NextPageWithLayout = () => {
  const { login } = useAuth();
  const { isAlertActive, alert } = usePopupsContext();
  const { authState } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (formData.email && formData.password) setIsDisabled(false);
    if (!formData.email || !formData.password) setIsDisabled(true);
  }, [formData, isAlertActive]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await login(formData);
    } catch (error: unknown) {
      console.error(error);
    }
    setIsLoading(false);
    setFormData(reset);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center relative ">
      <div className="container">
        {" "}
        <form
          className="flex flex-col items-center justify-between gap-x-[5%] "
          onSubmit={handleSubmit}
        >
          <Input
            label={"What is your email?"}
            handleInputChange={handleInputChange}
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
          />
          <Input
            label={"Password"}
            handleInputChange={handleInputChange}
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
          />
          <button
            type="submit"
            className={`btn bg-[#3795BD] hover:bg-[#2c7797] mx-auto ${
              isDisabled && "disabled:bg-[#a2d7f7] border-none"
            }`}
            disabled={isDisabled}
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
          <Link href="/register" className="mt-4 text-sm text-white">
            Don&apos;t have an account?
          </Link>
        </form>
      </div>
      {isAlertActive ? (
        <Alert
          type={alert?.type}
          message={alert?.message}
          styles={`${
            !isAlertActive && "none"
          } absolute w-[273px] bottom-2 right-2 animate-pulse transition`}
        />
      ) : null}
    </main>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return <NoLayout>{page}</NoLayout>;
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const isAuthenticated = ctx?.req?.headers.cookie?.split("=")[1] as string;
//   if (isAuthenticated) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// };
