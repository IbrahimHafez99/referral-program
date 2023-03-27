import { LinkAPI } from "@/src/apis/linkAPI";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import cookie from "cookie";
import { useCookies } from "react-cookie";
import { usePopupsContext } from "@/src/context/PopupsContext";
import Alert from "@/src/components/Alert";
import Tr from "@/src/components/dashbaord/Tr";
import Modal from "@/src/components/Modal";
type Link = {
  referral: string;
};

type DashboardProps = {
  links: Link[];
};
const Dashboard = (props: DashboardProps) => {
  const { isAlertActive, setIsAlertActive, alert, setAlert } =
    usePopupsContext();
  const [couponCode, setCouponCode] = useState<string>("");
  const [cookie] = useCookies(["jwt"]);
  const [links, setLinks] = useState<Link[]>(props.links);
  let timeoutID: NodeJS.Timeout;

  const handleCreateNewLink = async () => {
    const response = await LinkAPI.create(cookie.jwt);
    if (response.status === 201) {
      setLinks((prev) => [...prev, { referral: response.data.referral }]);
      clearTimeout(timeoutID);
      setAlert({
        type: "success",
        message: response.message,
        styles: "fixed w-[273px] bottom-2 right-2 transition transition-all",
      });
      setIsAlertActive(true);
      timeoutID = setTimeout(() => {
        setIsAlertActive(false);
      }, 4000);
    } else {
      clearTimeout(timeoutID);
      setAlert({
        type: "error",
        message: response.message,
        styles: "fixed w-[273px] bottom-2 right-2 transition transition-all",
      });
      setIsAlertActive(true);
      timeoutID = setTimeout(() => {
        setIsAlertActive(false);
      }, 4000);
    }
  };

  const handleSubmitCustomLink = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const response = await LinkAPI.create(cookie.jwt, couponCode);
    if (response.status === 201) {
      setLinks((prev) => [...prev, { referral: response.data.referral }]);
      clearTimeout(timeoutID);
      setAlert({
        type: "success",
        message: response.message,
        styles: "fixed w-[273px] bottom-2 right-2 transition transition-all",
      });
      setIsAlertActive(true);
      timeoutID = setTimeout(() => {
        setIsAlertActive(false);
      }, 4000);
    } else {
      clearTimeout(timeoutID);
      setAlert({
        type: "error",
        message: response.message,
        styles: "fixed w-[273px] bottom-2 right-2 transition transition-all",
      });
      setIsAlertActive(true);
      timeoutID = setTimeout(() => {
        setIsAlertActive(false);
      }, 4000);
    }
    const modal = document.getElementById("my-modal-4");
    if (modal && modal.classList.contains("modal-open")) {
      modal.classList.remove("modal-open");
    }
    console.log(modal);
    setCouponCode("");
  };
  return (
    <React.Fragment>
      <main>
        <div className="container">
          <div className="overflow-x-auto  flex justify-center flex-wrap">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Link</th>
                  <th>Copy</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => (
                  <Tr key={index} index={index} referral={link.referral} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center space-x-4 items-center mt-4">
            <button
              onClick={handleCreateNewLink}
              className="btn  btn-primary"
              disabled={links.length >= 5}
            >
              Create a new link
            </button>
            {links.length >= 5 ? (
              <button className="btn btn-primary" disabled={true}>
                Create a custom link
              </button>
            ) : (
              <label htmlFor="my-modal-4" className="btn btn-primary">
                Create a custom link
              </label>
            )}
          </div>
        </div>
        {isAlertActive ? (
          <Alert
            type={alert?.type}
            message={alert?.message}
            styles={`${!isAlertActive && "none"} ${alert.styles}`}
          />
        ) : null}
      </main>
      <Modal styles="w-[40%]">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">Create a custom link</h3>
          <form onSubmit={handleSubmitCustomLink}>
            <input
              type="text"
              placeholder="QR_ME"
              className="input input-bordered input-md w-full mt-4"
              value={couponCode}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCouponCode(event.target.value);
              }}
            />
            <button type="submit" className="btn btn-ghost self-center mt-4">
              Create
            </button>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps<
  | {
      links: Link[];
    }
  | {}
> = async ({ req }) => {
  try {
    const parsedCookies = cookie.parse(req.headers?.cookie!);
    const response = await LinkAPI.get(parsedCookies.jwt);
    const links: Link[] = response.data;
    return { props: { links } };
  } catch (error) {
    return { props: {} };
  }
};
