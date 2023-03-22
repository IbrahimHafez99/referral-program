import { LinkAPI } from "@/src/apis/linkAPI";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import cookie from "cookie";
import { useCookies } from "react-cookie";
import { usePopupsContext } from "@/src/context/PopupsContext";
import Alert from "@/src/components/Alert";
import Tr from "@/src/components/dashbaord/Tr";
type Link = {
  referral: string;
};

type DashboardProps = {
  links: Link[];
};
const Dashboard = (props: DashboardProps) => {
  const { isAlertActive, setIsAlertActive, alert, setAlert } =
    usePopupsContext();

  const [error, setError] = useState("");
  const [cookie] = useCookies(["jwt"]);
  const [links, setLinks] = useState<Link[]>(props.links);
  let timeoutID: NodeJS.Timeout;
  const handleCreateNewLink = async () => {
    const response = await LinkAPI.create(cookie.jwt);
    console.log(console.log(response));
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
  return (
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
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={handleCreateNewLink}
              className="btn btn-active btn-primary w-full self-start mt-5"
            >
              Create a new link
            </button>
            <div>{error}</div>
          </div>
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
