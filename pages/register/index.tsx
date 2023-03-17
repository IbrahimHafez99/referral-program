import React, { ReactElement, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import PhoneInput from "react-phone-number-input";

import Input from "@/src/components/Input";
import { RegisterAPI } from "@/src/apis/registerAPI";
import Alert from "@/src/components/Alert";
import { usePopupsContext } from "@/src/context/PopupsContext";
import type { AlertProps } from "@/src/types/User";
import { useRouter } from "next/router";
type RegistrationFormData = {
  fullName: string;
  email: string;
  password: string;
};

const reset = { fullName: "", email: "", password: "" };

const Registration: NextPageWithLayout = () => {
  const router = useRouter();
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [value, setValue] = useState<any>();
  const [alert, setAlert] = useState<AlertProps>({
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
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
    console.log({ ...formData, value });
    setIsAlertActive(true);
    try {
      const response = await RegisterAPI.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: value,
      });
      setIsAlertActive(true);
      console.log(response.data);
      setAlert({ message: "Registered Successfully", type: "success" });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      setAlert({
        message: error.response.data.message as string,
        type: "error",
      });
      console.error(error);
    }

    setValue("");
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
            <label className="phone-label label-text">Phone number</label>
            <PhoneInput
              defaultCountry="OM"
              placeholder="Phone number"
              value={value}
              onChange={setValue}
            />
          </div>
          <button type="submit" className="btn btn-primary mx-auto">
            Register
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

export default Registration;

Registration.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
