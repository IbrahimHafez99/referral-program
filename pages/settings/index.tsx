import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  children: React.ReactElement;
};

const SettingsPage = ({ children }: Props) => {
  const router = useRouter();
  const [isLinkActive, setIsLinkActive] = useState(
    router.pathname.split("/").includes("profile")
      ? "profile"
      : router.pathname.split("/").includes("privacy")
      ? "privacy"
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
              isLinkActive === "profile" && "bg-[#c7c8ca] rounded-lg"
            }`}
            onClick={() => setIsLinkActive("profile")}
          >
            <Link href="/settings/profile">Profile</Link>
          </li>
          <li
            className={`${
              isLinkActive === "privacy" && "bg-[#c7c8ca] rounded-lg"
            }`}
            onClick={() => setIsLinkActive("privacy")}
          >
            <Link href="/settings/privacy">Privacy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
