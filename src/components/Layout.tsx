import React from "react";
import NavBar from "./NavBar";
const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <NavBar />

      <main className="mt-[64px]">{children}</main>
    </>
  );
};

export default Layout;
