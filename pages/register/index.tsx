import React, { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import PhoneInput from "react-phone-number-input";
import Link from "next/link";
import Input from "@/src/components/Input";
import { RegisterAPI } from "@/src/apis/registerAPI";
import Alert from "@/src/components/Alert";
import { useRouter } from "next/router";
import { useAuthContext } from "@/src/context/AuthContext";
import Loader from "@/src/components/Loader";
import NoLayout from "@/src/components/NoLayout";
import { usePopupsContext } from "@/src/context/PopupsContext";
type RegistrationFormData = {
  fullName: string;
  email: string;
  password: string;
};

const reset = { fullName: "", email: "", password: "" };

const Registration: NextPageWithLayout = () => {
  const { authState, setAuthState } = useAuthContext();
  const { isAlertActive, setIsAlertActive, alert, setAlert } =
    usePopupsContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState<any>();
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  useEffect(() => {
    if (formData.email && formData.fullName && formData.password && value)
      setIsDisabled(false);
    if (!formData.email || !formData.fullName || !formData.password || !value)
      setIsDisabled(true);
  }, [formData, value]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthState((prevAuthState) => ({ ...prevAuthState, loading: true }));
    setIsDisabled(true);
    try {
      setIsLoading(true);
      const response = await RegisterAPI.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: value,
      });
      setAlert({ message: response.data.message, type: "success" });
      setIsAlertActive(true);
      setTimeout(() => {
        setIsAlertActive(false);
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setAlert({
        message: error.response.data.message as string,
        type: "error",
      });
      setIsAlertActive(true);
      setTimeout(() => {
        setIsAlertActive(false);
      }, 2000);
      console.error(error);
    }
    setAuthState((prevAuthState) => ({ ...prevAuthState, loading: false }));
    setValue("");
    setIsLoading(false);
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
            label={"What is your name?"}
            handleInputChange={handleInputChange}
            placeholder="Full name"
            type="text"
            name="fullName"
            value={formData.fullName}
          />
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

          {/* <Input
            label={"Phone Number"}
            handleInputChange={handleInputChange}
            placeholder="Phone number"
            type="text"
            name="phone"
            value={formData.phoneNumber}
          /> */}
          <div className="form-control w-[45%] max-w-xs ">
            <label className="phone-label label-text text-white">
              Phone number
            </label>
            <PhoneInput
              defaultCountry="OM"
              placeholder="Phone number"
              value={value}
              onChange={setValue}
            />
          </div>
          <button
            type="submit"
            className={`btn bg-[#3795BD] hover:bg-[#2c7797] mx-auto ${
              isDisabled && "disabled:bg-[#a2d7f7] border-none"
            }`}
            disabled={isDisabled}
          >
            {isLoading ? <Loader /> : "Register"}
          </button>
          <Link href="/login" className="mt-4 text-sm text-white">
            Already have an account?
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

export default Registration;

Registration.getLayout = function getLayout(page: ReactElement) {
  return <NoLayout>{page}</NoLayout>;
};
