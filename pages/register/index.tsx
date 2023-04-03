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
import Layout from "@/src/components/Layout";
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
  const [error, setError] = useState("");
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
    setError("");
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
    setIsDisabled(true);
    try {
      setIsLoading(true);
      const response = await RegisterAPI.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: value,
      });
      console.log();
      setAlert({ message: response.data.message, type: "success" });
      setIsAlertActive(true);
    } catch (error: any) {
      console.log("coming in catch");
      setError(error.response.data.message);
    }
    setValue("");
    setIsLoading(false);
    setFormData(reset);
  };
  return (
    <main className="landing-page bg-[#ebebeb] flex justify-center items-center relative">
      <div className="shadow-first bg-white rounded-xl p-6 w-[70%] max-w-[420px] xs:w-[92%]">
        <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
        <form
          className="flex flex-col justify-center items-center gap-x-[5%]"
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
          <div className="form-control w-full mx-w-[400px] justify-center items-start mb-2">
            <label className="phone-label label-text">Phone number</label>
            <PhoneInput
              defaultCountry="OM"
              placeholder="Phone number"
              value={value}
              onChange={setValue}
            />
          </div>
          {error &&
            Object.values(formData).every((val) => val === "") &&
            !value && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`btn bg-[var(--primary-color)] mx-auto ${
              isDisabled && "btn-disabled"
            }`}
            disabled={isDisabled}
          >
            {isLoading ? <Loader /> : "Register"}
          </button>
          <Link href="/login" className="mt-4 text-sm">
            Already have an account?
          </Link>
        </form>
      </div>
      {isAlertActive && (
        <Alert
          type={alert?.type}
          message={alert?.message}
          styles={`absolute w-[273px] bottom-2 right-2 animate-pulse transition`}
        />
      )}
    </main>
  );
};

export default Registration;

// Registration.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };
