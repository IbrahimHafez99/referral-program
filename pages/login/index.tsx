import React, { ReactElement, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import Input from "@/src/components/Input";
import Alert from "@/src/components/Alert";
import type { AlertProps } from "@/src/types/User";
import { useRouter } from "next/router";
import { LoginAPI } from "../../src/apis/loginAPI";
type LoginFormData = {
  email: string;
  password: string;
};

const reset = { email: "", password: "" };

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAlertActive(true);
    try {
      const response = await LoginAPI.login({
        email: formData.email,
        password: formData.password,
      });
      setIsAlertActive(true);
      console.log(response.data);
      setAlert({ message: "Loggedin Successfully", type: "success" });
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error: any) {
      setAlert({
        message: error.response.data.message as string,
        type: "error",
      });
      console.error(error);
    }
    setFormData(reset);
  };

  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center items-center relative">
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
          <button type="submit" className="btn btn-primary mx-auto">
            Login
          </button>
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
  return <>{page}</>;
};
