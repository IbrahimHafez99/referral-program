import React from "react";
import { PopupsProdvider } from "../context/PopupsContext";
import { AuthProvider } from "../context/AuthContext";
const NoLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <AuthProvider>
      <PopupsProdvider>{children}</PopupsProdvider>
    </AuthProvider>
  );
};

export default NoLayout;
