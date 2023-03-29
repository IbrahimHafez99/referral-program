import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
type PageProps = {
  children: React.ReactElement;
};
const AdminDashboardPage = ({ children }: PageProps) => {
  const router = useRouter();
  const [isLinkActive, setIsLinkActive] = useState(
    router.pathname.split("/").includes("user")
      ? "users"
      : router.pathname.split("/").includes("reward")
      ? "reward"
      : ""
  );

  return (
    <div className="drawer drawer-mobile landing-page">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <!-- Page content here --> */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost w-full drawer-button lg:hidden"
          >
            Menu
          </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
        <ul className="menu p-4 w-40 text-base-content bg-[#e7e8e9]">
          {/* <!-- Sidebar content here --> */}
          <li
            className={`${
              isLinkActive === "users" && "bg-[#c7c8ca] rounded-lg"
            }`}
            onClick={() => setIsLinkActive("users")}
          >
            <Link href="/admin/dashboard/user">Users</Link>
          </li>
          <li
            className={`${
              isLinkActive === "reward" && "bg-[#c7c8ca] rounded-lg"
            }`}
            onClick={() => setIsLinkActive("reward")}
          >
            <Link href="/admin/dashboard/reward">Reward</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
