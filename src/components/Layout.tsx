import React from "react";
import NavBar from "./NavBar";
const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <NavBar />

      <main>{children}</main>
      
    </>
  );
};

export default Layout;
