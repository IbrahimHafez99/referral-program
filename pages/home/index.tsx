import { LinkAPI } from "@/src/apis/linkAPI";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import cookie from "cookie";
type Link = {
  referral: string;
};

type HomeProps = {
  links: Link[];
};
const Home = (props: HomeProps) => {
  const [links, setLinks] = useState<Link[]>(props.links);
  return (
    <div className="container">
      <div className="overflow-x-auto flex justify-center">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Link</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>https://www.qrlix.com/pruchases/{links[0].referral}</td>
              <td>{links[0].referral}</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>some lorem non sense</td>
              <td>some lorem non sense</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

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
