import React, { useState, useEffect } from "react";
import AdminDashboardPage from ".";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { userAPI } from "../../../src/apis/userAPI";
import Tr from "@/src/components/admin/Tr";
import { useCookies } from "react-cookie";
export type AdminUser = {
  email: string;
  name: string;
  phoneNumber: string;
  User_Roles: { roleId: number }[];
  isSuspended: boolean;
};
type Props = {
  users: AdminUser[];
  count: number;
};

const AdminUserPage = ({ users, count }: Props) => {
  const [cookie] = useCookies(["jwt"]);
  const [pageUsers, setPageUsers] = useState<AdminUser[]>(users);
  const [page, setPage] = useState<number>(1);
  const maxPage = Math.ceil(count / 5);
  useEffect(() => {
    async function getUsers() {
      const response = await userAPI.get(cookie.jwt, page);
      setPageUsers(response?.data);
    }
    getUsers();
  }, [page]);
  return (
    <AdminDashboardPage>
      <>
        <div className="overflow-x-auto w-full min-h-[452px]">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>isAdmin</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Suspend</th>
              </tr>
            </thead>
            <tbody>
              {pageUsers.map((user, index) => (
                <Tr key={index} user={user} setPageUsers={setPageUsers} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-5">
          <div className="btn-group">
            <button
              className="btn"
              onClick={() => {
                if (page > 1) setPage((prev) => --prev);
              }}
            >
              «
            </button>
            <button className="btn">Page {page}</button>
            <button
              className="btn"
              onClick={() => {
                if (page < maxPage) setPage((prev) => ++prev);
              }}
            >
              »
            </button>
          </div>
        </div>
      </>
    </AdminDashboardPage>
  );
};

export default AdminUserPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const parsedCookies = cookie.parse(req.headers?.cookie!);
  const responseOne = await userAPI.get(parsedCookies.jwt, 1);
  const responseTwo = await userAPI.count(parsedCookies.jwt);
  return { props: { users: responseOne.data, count: responseTwo.data } };
};
